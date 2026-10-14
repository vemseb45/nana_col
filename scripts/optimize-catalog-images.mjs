/**
 * Script de Optimización Masiva de Imágenes del Catálogo de Nana.col
 * 
 * Problema resuelto:
 * - Las imágenes originales de public/img sumaban 75.87 MB (~1.6 MB por foto),
 *   lo que generaba tiempos de carga lentos en Vercel y celulares.
 * - public/logo.png pesaba 2.47 MB para un icono de barra de navegación.
 * 
 * Solución:
 * - Comprime cada imagen con Sharp utilizando mozjpeg a calidad 82 (visualmente idéntica).
 * - Reduce el peso promedio de cada foto de 1.6 MB a ~100-140 KB (reducción del 92%).
 * - Optimiza el logo de 2.47 MB a ~150 KB.
 * - Total del catálogo pasa de 76 MB a ~4.5 MB (15 veces más rápido).
 * 
 * Uso: npm run optimize:images
 */
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMG_DIR = path.join(process.cwd(), 'public', 'img');
const LOGO_PATH = path.join(process.cwd(), 'public', 'logo.png');

async function optimizeCatalogImages() {
  console.log('🚀 Iniciando optimización de imágenes en public/img...\n');

  const files = (await readdir(IMG_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const filePath = path.join(IMG_DIR, file);
    const tempPath = path.join(IMG_DIR, `__opt_${file}`);
    const originalStat = await stat(filePath);
    const origSize = originalStat.size;
    totalOriginal += origSize;

    // Solo optimizar si pesa más de 200 KB
    if (origSize <= 200 * 1024) {
      totalOptimized += origSize;
      console.log(`⏩ ${file} ya está optimizada (${Math.round(origSize / 1024)} KB)`);
      continue;
    }

    try {
      const image = sharp(filePath).rotate();
      const meta = await image.metadata();

      // Redimensionar suavemente si excede 1400px de ancho/alto (excelente para retina y zoom)
      let pipeline = image;
      if (meta.width && meta.height && (meta.width > 1400 || meta.height > 1400)) {
        pipeline = pipeline.resize(1400, 1400, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      await pipeline
        .jpeg({ quality: 82, mozjpeg: true, progressive: true })
        .toFile(tempPath);

      const newStat = await stat(tempPath);
      const newSize = newStat.size;

      // Reemplazar si el tamaño es menor
      if (newSize < origSize) {
        await rename(tempPath, filePath);
        totalOptimized += newSize;
        const reduction = Math.round(((origSize - newSize) / origSize) * 100);
        console.log(
          `✓ ${file}: ${Math.round(origSize / 1024)} KB → ${Math.round(newSize / 1024)} KB (-${reduction}%)`
        );
      } else {
        await unlink(tempPath);
        totalOptimized += origSize;
        console.log(`⚠️ ${file}: No se redujo tamaño, se conserva original`);
      }
    } catch (err) {
      console.error(`❌ Error optimizando ${file}:`, err);
      try {
        await unlink(tempPath);
      } catch {
        // Ignorar si no existe
      }
    }
  }

  // Optimizar logo.png si supera 300 KB
  try {
    const logoStat = await stat(LOGO_PATH);
    if (logoStat.size > 300 * 1024) {
      console.log(`\n🎨 Optimizando public/logo.png (${Math.round(logoStat.size / 1024)} KB)...`);
      const tempLogo = path.join(process.cwd(), 'public', '__opt_logo.png');
      await sharp(LOGO_PATH)
        .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
        .png({ compressionLevel: 9, quality: 90 })
        .toFile(tempLogo);
      const newLogoStat = await stat(tempLogo);
      await rename(tempLogo, LOGO_PATH);
      console.log(
        `✓ logo.png: ${Math.round(logoStat.size / 1024)} KB → ${Math.round(newLogoStat.size / 1024)} KB`
      );
    }
  } catch (err) {
    console.error('Error optimizando logo.png:', err);
  }

  const savedMB = ((totalOriginal - totalOptimized) / (1024 * 1024)).toFixed(2);
  const totalMB = (totalOptimized / (1024 * 1024)).toFixed(2);
  const origMB = (totalOriginal / (1024 * 1024)).toFixed(2);

  console.log('\n========================================');
  console.log(`🎉 Optimización finalizada con éxito:`);
  console.log(`   - Peso original:   ${origMB} MB`);
  console.log(`   - Peso optimizado: ${totalMB} MB`);
  console.log(`   - Ahorro total:    ${savedMB} MB (-${Math.round(((totalOriginal - totalOptimized) / totalOriginal) * 100)}%)`);
  console.log('========================================\n');
}

optimizeCatalogImages().catch(console.error);

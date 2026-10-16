import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

function createIcoBuffer(pngBuffersWithSizes) {
  const count = pngBuffersWithSizes.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // number of images

  const dirEntries = [];
  const imageBuffers = [];

  for (const { buffer, size } of pngBuffersWithSizes) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette (0 = no palette / PNG)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset

    dirEntries.push(entry);
    imageBuffers.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

async function main() {
  console.log('🌟 Generando Favicon e Iconos Redondos Oficiales de Nana.col...');

  const source = path.join(process.cwd(), 'src', 'app', 'icon.png');
  const cx = 682;
  const cy = 646;
  const r = 442; // radio óptimo del emblema circular
  const size = r * 2;

  // Máscara SVG circular con suavizado (anti-aliasing)
  const circleMask = Buffer.from(`
    <svg width="${size}" height="${size}">
      <circle cx="${r}" cy="${r}" r="${r - 1}" fill="white" />
    </svg>
  `);

  // Extraer el recuadro centrado del emblema
  const cropped = await sharp(source)
    .extract({
      left: cx - r,
      top: cy - r,
      width: size,
      height: size,
    })
    .toBuffer();

  // Aplicar máscara circular transparente
  const roundEmblem = await sharp(cropped)
    .composite([
      {
        input: circleMask,
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  // 1. Icono maestro de 512x512
  const png512 = await sharp(roundEmblem)
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toBuffer();

  // 2. Iconos para ICO (16, 32, 48)
  const png16 = await sharp(roundEmblem).resize(16, 16).png().toBuffer();
  const png32 = await sharp(roundEmblem).resize(32, 32).png().toBuffer();
  const png48 = await sharp(roundEmblem).resize(48, 48).png().toBuffer();

  // 3. Apple Touch Icon (180x180)
  const png180 = await sharp(roundEmblem).resize(180, 180).png().toBuffer();

  // 4. Logo redondo para Navbar y Footer (400x400)
  const png400 = await sharp(roundEmblem).resize(400, 400).png().toBuffer();

  // Crear archivo ICO multi-resolución con esquinas 100% transparentes
  const icoBuffer = createIcoBuffer([
    { buffer: png16, size: 16 },
    { buffer: png32, size: 32 },
    { buffer: png48, size: 48 },
  ]);

  // Escribir en las ubicaciones estándar
  await fs.writeFile(path.join(process.cwd(), 'public', 'favicon.ico'), icoBuffer);
  await fs.writeFile(path.join(process.cwd(), 'src', 'app', 'favicon.ico'), icoBuffer);
  await fs.writeFile(path.join(process.cwd(), 'src', 'app', 'icon.png'), png512);
  await fs.writeFile(path.join(process.cwd(), 'public', 'icon.png'), png512);
  await fs.writeFile(path.join(process.cwd(), 'public', 'favicon.png'), png512);
  await fs.writeFile(path.join(process.cwd(), 'public', 'apple-touch-icon.png'), png180);
  await fs.writeFile(path.join(process.cwd(), 'public', 'logo.png'), png400);

  console.log('✓ public/favicon.ico generado (16x16, 32x32, 48x48 con transparencia)');
  console.log('✓ src/app/favicon.ico generado');
  console.log('✓ src/app/icon.png generado (512x512 redondo)');
  console.log('✓ public/icon.png generado (512x512 redondo)');
  console.log('✓ public/favicon.png generado (512x512 redondo)');
  console.log('✓ public/apple-touch-icon.png generado (180x180)');
  console.log('✓ public/logo.png generado (400x400 redondo transparente)');
}

main().catch(console.error);

/**
 * Genera miniaturas livianas para la vista previa de WhatsApp (Open Graph).
 *
 * WhatsApp solo muestra la tarjeta con foto si la imagen og:image pesa poco
 * (idealmente < 300 KB). Las fotos originales de /public/img pesan ~1.5 MB,
 * por eso se generan versiones 1200x630 optimizadas en /public/og.
 *
 * El nombre de salida se normaliza a ASCII (niño -> nino) con la misma regla
 * que usa `getOgImagePath` en src/constants/brand.data.ts.
 *
 * Uso: npm run og:images
 */
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.join(process.cwd(), "public", "img");
const OUTPUT_DIR = path.join(process.cwd(), "public", "og");
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const BACKGROUND = "#FFF8F0";

function toOgFileName(fileName) {
  const baseName = path.parse(fileName).name;
  const asciiName = baseName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return `${asciiName}.jpg`;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const files = (await readdir(SOURCE_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  const generated = new Set();

  for (const file of files) {
    const outputName = toOgFileName(file);
    if (generated.has(outputName)) continue;
    generated.add(outputName);

    const info = await sharp(path.join(SOURCE_DIR, file))
      .rotate()
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "contain", background: BACKGROUND })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(OUTPUT_DIR, outputName));

    console.log(`✓ ${outputName} (${Math.round(info.size / 1024)} KB)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

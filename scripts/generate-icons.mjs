import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'public', 'icons', 'clear-voice-icon.svg');
const outDir = path.join(root, 'public', 'icons');

const outputs = [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['icon-maskable-512.png', 512]
];

await fs.mkdir(outDir, { recursive: true });

await Promise.all(
  outputs.map(([file, size]) =>
    sharp(source)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 248, g: 251, b: 250, alpha: 1 }
      })
      .png()
      .toFile(path.join(outDir, file))
  )
);

console.log(`Generated ${outputs.length} icon files in ${outDir}`);

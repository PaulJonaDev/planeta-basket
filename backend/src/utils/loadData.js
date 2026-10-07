import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

/**
 * Lee y parsea un archivo JSON dentro de src/data.
 * Se usa fs.readFileSync en lugar de "import ... assert { type: 'json' }"
 * para no depender de la versión de Node ni de flags experimentales.
 */
export function loadJSON(fileName) {
  const fullPath = path.join(DATA_DIR, fileName);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw);
}

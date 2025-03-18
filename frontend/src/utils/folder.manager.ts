import { promises as fs } from 'fs';
import path from 'path';

export async function copyFolder(src: string, dest: string) {
  try {
    await fs.cp(src, dest, { recursive: true });
   } catch (error) {
    console.error('❌ Error copying folder:', error);
  }
}

export function getSrcFolder() {
  let __dirname = decodeURIComponent(new URL(import.meta.url).pathname);
  if (process.platform === 'win32' && __dirname.startsWith('/')) {
    __dirname = __dirname.slice(1);
  }
  __dirname = path.dirname(__dirname);
  return path.resolve(__dirname, '..', 'dist', 'file-contents');
}

export function getDestFolder(projectName: string) {
  return path.resolve(process.cwd(), projectName);
}

export async function removeFolder(pathToFolder: string) {
  try {
    const normalizedPath = path.normalize(pathToFolder);
    await fs.rm(normalizedPath, { recursive: true, force: true }
    )
  } catch (error) {
    console.error('❌ Error removing folder:', error);
  }
}
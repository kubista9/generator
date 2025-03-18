import { FileModificationParams } from '../interfaces/file.modifications.js';
import fs from 'fs/promises';
import path from 'path';

export async function modifyFile(params: FileModificationParams): Promise<void> {
  try {
    const fullPath = path.resolve(params.filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, params.content, 'utf8');
  } catch (error) {
    console.error(`Error modifying file ${params.filePath}:`, error);
  }
}
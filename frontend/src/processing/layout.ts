import { ThreeColumnsLayoutHtml, ThreeColumnsLayoutAppModuleTs, ThreeColumnsLayoutScss } from "../layout/three.columns.layout.js";
import { LeftLayoutComponentHtml, LeftMenuLayoutAppModuleTs } from "../layout/left.menu.layout.js";
import { FileModificationParams } from "../interfaces/file.modifications.js";
import { removeFolder } from "../utils/folder.manager.js";
import { modifyFile} from "../utils/file.manager.js";
import path from 'path';

export async function createLayout(layout: string) {
  console.log('📐 Creating layout:', layout);
  try {
    if (layout === 'left-menu') {
        const headerPath = path.resolve(process.cwd(), 'src', 'app', 'components', 'header');
        await removeFolder(headerPath);
        await createLeftMenuLayout();
    }
    if (layout === 'three-columns') { 
        const sideMenuPath = path.resolve(process.cwd(), 'src', 'app', 'components', 'side-menu');
        await removeFolder(sideMenuPath);
        await createThreeColumnsLayout();
    }
  } catch (error) {
    console.error('❌ Error creating layout:', error);
  }
}

async function createThreeColumnsLayout(): Promise<void> {
  const modifications = [
    {
      filePath: 'src/app/layout/layout.component.html',
      content: ThreeColumnsLayoutHtml
    },
    {
      filePath: 'src/app/app.module.ts',
      content: ThreeColumnsLayoutAppModuleTs
    },
    {
      filePath: 'src/app/layout/layout.component.scss',
      content: ThreeColumnsLayoutScss
    }
  ];
  await applyModifications(modifications);
}

async function createLeftMenuLayout(): Promise<void> {
  const modifications = [
    {
      filePath: 'src/app/layout/layout.component.html',
      content: LeftLayoutComponentHtml
    },
    {
      filePath: 'src/app/app.module.ts',
      content: LeftMenuLayoutAppModuleTs
    }
  ];
  await applyModifications(modifications);
}

async function applyModifications(modifications: FileModificationParams[]): Promise<void> {
  try {
    await Promise.all(modifications.map(mod => modifyFile(mod)));
  } catch (error) {
    console.error('Failed to create layout:', error);
  }
}
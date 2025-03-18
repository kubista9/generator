import { copyFolder, getSrcFolder, getDestFolder } from '../utils/folder.manager.js';
import { getAngularJsonUpdates } from '../utils/json.manager.js';
import { getConfigJsonKeys } from '../utils/json.manager.js';
import { AnswerManager } from '../utils/answer.manager.js';
import { modifyJsonFile } from '../utils/json.manager.js';
import { npmInstall } from './npm.install.js';
import { createLayout } from './layout.js';
import { readFile } from 'fs/promises';
import { ngNew } from './ng.new.js';
import { join } from 'path';

export async function createProject() {
  const answerManager = new AnswerManager();
  const answers = await answerManager.readAnswers();
  const srcFolder = getSrcFolder();
  const destFolder = getDestFolder(answers.projectName);

  try {
    //ng new
    await ngNew(answers.projectName);

    //copy folder
    process.chdir(answers.projectName);
    await copyFolder(srcFolder, destFolder);

    //json maniplation
    const angularJsonContent = await readFile(join(process.cwd(), 'angular.json'), 'utf-8');
    const angularJson = JSON.parse(angularJsonContent);
    const projectName = Object.keys(angularJson.projects)[0];
    const angularJsonUpdates = getAngularJsonUpdates(projectName, answers.webFoundations);
    const configJsonUpdates = getConfigJsonKeys(answers.clientId, answers.tenantId);
    await modifyJsonFile(angularJsonUpdates);
    await modifyJsonFile(configJsonUpdates);

    //layout
    await createLayout(answers.applicationLayout);

    //npm install
    await npmInstall(answers.webComponents, answers.webFoundations, answers.i18n, answers.pwa);

  } catch (error) {
    console.error('❌ Error creating the Angular project:', error);
  }
}
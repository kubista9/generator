import { UpdateConfigOptions } from '../interfaces/update.config.options.js';
import { AngularJsonKeys } from '../enums/angular.json.keys.enums.js';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function modifyJsonFile(options: UpdateConfigOptions) {
  try {
    const { filePath, updates } = options;
    const resolvedPath = join(process.cwd(), ...filePath.split('/'));
    const fileContent = await readFile(resolvedPath, 'utf-8');
    const jsonContent = JSON.parse(fileContent);

    Object.keys(updates).forEach((key) => {
      const keys = key.split('.');
      let current = jsonContent;
      keys.slice(0, -1).forEach((k) => {
        current = current[k] = current[k] || {};
      });
      current[keys[keys.length - 1]] = updates[key];
    }
  );
    await writeFile(resolvedPath, JSON.stringify(jsonContent, null, 2), 'utf-8');
    console.log(`✅ Successfully updated ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${options.filePath}:`, error);
  }
}

export function resolveKeyPath(key: AngularJsonKeys, placeholders: Record<string, string>): string {
  return Object.keys(placeholders).reduce(
    (resolvedKey, placeholder) => resolvedKey.replace(`{${placeholder}}`, placeholders[placeholder]),
    key
  );
}

export function getAngularJsonUpdates(projectName: string, webFoundations: string) {
  return {
    filePath: 'angular.json',
    updates: {
      [resolveKeyPath(AngularJsonKeys.Assets, { projectName })]: [
        "src/favicon.ico",
        "src/assets",
        {
          glob: "**/*",
          input: "./node_modules/@depsit/uxdevacc-foundations/dist/assets/",
          output: "./assets/",
        },
      ],
      [resolveKeyPath(AngularJsonKeys.Styles, { projectName })]: [
        "src/styles.scss",
        "src/../node_modules/@depsit/uxdevacc-foundations/dist/dps-uxdevacc-foundations_" + webFoundations + ".css",
      ],
      [resolveKeyPath(AngularJsonKeys.Scripts, { projectName })]: [],
    },
  };
}

export function getConfigJsonKeys(clientId: string, tenantId: string){
  return {
    filePath: 'src/assets/config.json',
    updates : {
      'msalConfig.clientId': clientId,
      'msalConfig.authority': `https://login.microsoftonline.com/${tenantId}`,
    },
  };
}
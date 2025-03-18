import { input, confirm, select } from "@inquirer/prompts";

const validateInput = (input: string) => {
  if (input.length === 0) {
    return '❗ You must provide a value.';
  }
  return true;
};

export async function generateQuestions() {
  const questions = {
    projectName: await input({
      message: "💡 What is the name of your Angular project? ",
      validate: validateInput,
    }),
    azureAccess: await confirm({
      message: '🔑 Do you have access to UCB Azure DevOps? ',
    }),
    portalAccess: await confirm({
      message: '🔑 Do you have an app registered in Azure portal? ',
    }),
    clientId: await input({
      message: '🔒 What is your client ID? ',
      validate: validateInput,
    }),
    tenantId: await input({
      message: '🔒 What is your tenant ID? ',
      validate: validateInput,
    }),
    webComponents: await select({
      message: '⚙️  What version of DEPSIT web components would you like to use? ',
      choices: [
        { name: '1.0.8', value: '1.0.8' },
        { name: '1.0.7', value: '1.0.7' },
        { name: '1.0.6', value: '1.0.6' }
      ],
    }),
    webFoundations: await select({
      message: '⚙️  What version of DEPSIT foundations would you like to use? ',
      choices: [
        { name: '1.0.2', value: '1.0.2' },
        { name: '1.0.1', value: '1.0.1' },
        { name: '1.0.0', value: '1.0.0' }
      ],
    }),
    /**
    useI18n: await confirm({
      message: '🌐 Would you like add package for setting up Internationalization (i18n)? ',
    }),
    pwaSupport: await confirm({
      message: '📱 Would you like to add package for setting up Progressive Web App (pwa)? ',
    }),
    */
    applicationLayout: await select({
      message: '🖼️  What kind of application layout would you like to use? ',
      choices: [
        { name: 'Basic layout ( sidebar, header + main content )', value: 'basic-layout' },
        { name: 'Left menu ( sidebar + main content )', value: 'left-menu'},
        { name: 'Three columns ( header, main content in three columns )', value: 'three-columns'},
      ],
    }),
    confirmation: await confirm({
      message: '❓ Is everything OK with the settings above? ',
    }),
  };
  return questions;
}
import { execa } from 'execa';

export async function npmInstall(
  webComponents: string, 
  webFoundations: string, 
  i18n: boolean, 
  pwa: boolean
) {
  const installParams: string[][] = [
    ['jest'],
    ['eslint'],
    ['rxjs'],

    ['@depsit/chattypes'],
    [`@depsit/uxdevacc-components@${webComponents}`],
    [`@depsit/uxdevacc-foundations@${webFoundations}`],

    ['@ngrx/effects'],
    ['@ngrx/entity'],
    ['@ngrx/router-store'],
    ['@ngrx/store'],
    ['@ngrx/store-devtools'],

    ['@azure/msal-angular',],
    ['@azure/msal-browser'],
    ['@angular/service-worker'],
    ['@microsoft/applicationinsights-web'],
  ];
  /**
  if (i18n === true) {
    installParams.push(['@angular/localize']);
    console.log('Adding internationalization package');
  }

  if (pwa === true) {
    installParams.push(['@angular/pwa']);
    console.log('Adding PWA package');
  }
  */
  try {
    console.log('📦 Installing additional packages. This will take a few minutes...');
    for (const param of installParams) {
      await execa('npm', ['install', ...param]);
      console.log(`✅ ${param[0]} installed successfully!`);
    }
  } catch (error) {
    console.error('❌ Error installing additional packages:', error);
  }
}
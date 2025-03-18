import { execa } from 'execa';

export async function ngNew(projectName: string) {
  const ngNewParams = [
    'new',
    projectName,
    '--skip-install',
    '--style=scss',
    '--routing=true',
    '--no-ssr'
  ];

  try {
    console.log('🚀 Creating Angular project...');
    await execa('ng', ngNewParams, { stdio: 'inherit' });
    console.log('🎉 Project created successfully!');
  } catch (error) {
    console.error('❌ Error creating Angular project:', error);
  }
}
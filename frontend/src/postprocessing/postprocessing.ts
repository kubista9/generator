import { execa } from 'execa';

export async function postprocessing() {
    try {
        console.log(`⏳ Checking for updates`); 
        await execa('npx', ['npm-check-updates'], { stdio: 'inherit', });
        console.log("Starting the Angular server...");
        await execa('ng', ['serve'], {stdio: 'inherit',});
    } catch (error) {
        console.error('❌ Error during postprocessing', error);
    }
}
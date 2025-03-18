import { postprocessing } from "./postprocessing/postprocessing.js";
import { askQuestions } from "./preprocessing/preprocessing.js";
import { createProject } from "./processing/processing.js";

async function main() {
  try {
    await askQuestions(); 
    await createProject();
    await postprocessing();
  } catch (error) {
    console.error('Error during project setup:', error);
  }
}

main();
import { AnswerManager } from "../utils/answer.manager.js";
import { generateQuestions } from "./questions.js";

export async function askQuestions() {
  let questions;
  
  do {
    questions = await generateQuestions();
  } while (!questions.confirmation);

  try {
    console.log("✅ Getting your project ready with these settings", JSON.stringify(questions, null, 2));
    const answerManager = new AnswerManager();
    await answerManager.writeAnswers(questions);
    return questions;
  } catch (error) {
    console.error("❌ Failed to save answers to file:", error);
    throw error;
  }
}
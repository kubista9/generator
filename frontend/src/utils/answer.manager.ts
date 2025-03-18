import { AnswersFileName } from '../enums/answers.file.name.enum.js';
import { Answer } from './answer.js';
import * as fs from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

const answersPath = tmpdir();
const filePath = join(answersPath, AnswersFileName.FILENAME);

export class AnswerManager {
  private answers: Answer<any>[] = [];
  private filePath: string = filePath;

  constructor(answers?: Answer<any>[], filePath?: string) {
    if (answers) {
      this.answers = answers;
      this.filePath = filePath? filePath : this.filePath;
    }
  }

  public dump(): void {
    console.log(this.answers);
  }

  public getAnswers(): Answer<any>[] {
    return this.answers;
  }

  public setAnswers(newAnswers: Answer<any>[]): void {
    this.answers = newAnswers;
  }

  public validateAnswers(): boolean {
    return this.answers.every((answer) => answer.validate());
  }

  public async writeAnswers(questions: any): Promise<void> {
    try {
      const jsonData = JSON.stringify(questions, null, 2);
      await fs.writeFile(this.filePath, jsonData, 'utf-8');
      console.log(`✅ Successfully written to ${AnswersFileName.FILENAME}`);
    } catch (error) {
      console.error(`❌ Error writing to file: ${AnswersFileName.FILENAME}`, error);
    }
  }

  public async readAnswers(): Promise<any> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const answers = JSON.parse(data);
      console.log('✅ Answers loaded successfully!');
      return answers;
    } catch (error) {
      console.error(`❌ Error loading or parsing file: ${AnswersFileName.FILENAME}`, error);
    }
  }
}
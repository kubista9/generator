import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { askQuestions } from '../src/preprocessing/preprocessing'; 
import { questions } from '../src/preprocessing/questions';
import { AnswerManager } from '../src/utils/answer.manager';
import { join } from 'path';
import { tmpdir } from 'os';

const testAnswersPath = join(tmpdir(), 'test-answers');

describe('askQuestions', () => {
  let answerManagerMock: AnswerManager;
  let consoleLogSpy: any;

  beforeEach(() => {
    answerManagerMock = new AnswerManager([], testAnswersPath);
    vi.spyOn(answerManagerMock, 'writeAnswers').mockResolvedValue(undefined);
    consoleLogSpy = vi.spyOn(console, 'log');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should reset answers and restart if confirmation is false', async () => {
    questions.confirmation = false;

    await askQuestions();

    expect(consoleLogSpy).toHaveBeenCalledWith("🔄 Resetting answers and starting all over again.");
    Object.values(questions).forEach((question) => {
      expect(question).toBeUndefined();
    });
  });

  it('should log settings and save answers if confirmation is true', async () => {
    questions.confirmation = true;
    questions.projectName = 'test-project-name';

    await askQuestions();

    expect(consoleLogSpy).toHaveBeenCalledWith("✅ Getting your project ready with these settings", JSON.stringify(questions, null, ' '));
  });

  it('should write answers into answers.json', async () => {
    questions.confirmation = true;
    await askQuestions();
    expect(consoleLogSpy).toHaveBeenCalledWith("✅ Successfully written to answers.json");
  });
});
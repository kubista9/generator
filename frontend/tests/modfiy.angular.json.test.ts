import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFile, writeFile } from 'fs/promises';
import { join, normalize } from 'path';
import { modifyAngularJson } from '../src/processing/processes/modify.angular.json'; 

vi.mock('fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
}));

describe('modifyAngularJson', () => {
  const angularJsonPath = normalize(join(process.cwd(), 'angular.json'));
  const initialAngularJsonContent = JSON.stringify({
    projects: {
      myApp: {
        architect: {
          build: {
            options: {
              assets: ["src/favicon.ico", "src/assets"],
              styles: ["src/styles.scss"],
              scripts: [],
            },
          },
        },
      },
    },
  }, null, 2);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should read and update angular.json with correct build options', async () => {
    vi.mocked(readFile).mockResolvedValueOnce(initialAngularJsonContent);
    const writeFileSpy = vi.mocked(writeFile);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await modifyAngularJson();

    expect(readFile).toHaveBeenCalledWith(angularJsonPath, 'utf-8');
    expect(writeFileSpy).toHaveBeenCalledWith(
      angularJsonPath,
      JSON.stringify(
        {
          projects: {
            myApp: {
              architect: {
                build: {
                  options: {
                    assets: [
                      "src/favicon.ico",
                      "src/assets",
                      {
                        glob: "**/*",
                        input: "./node_modules/@depsit/uxdevacc-foundations/dist/assets/",
                        output: "./assets/",
                      },
                    ],
                    styles: [
                      "src/styles.scss",
                      "src/../node_modules/@depsit/uxdevacc-foundations/dist/dps-uxdevacc-foundations_1.0.0.css",
                    ],
                    scripts: [],
                  },
                },
              },
            },
          },
        },
        null,
        2
      ),
      'utf-8'
    );
    expect(consoleLogSpy).toHaveBeenCalledWith('✅ angular.json updated successfully!');
  });

  it('should add scripts array if it does not exist', async () => {
    const initialContentWithoutScripts = JSON.stringify({
      projects: {
        myApp: {
          architect: {
            build: {
              options: {
                assets: ["src/favicon.ico", "src/assets"],
                styles: ["src/styles.scss"],
              },
            },
          },
        },
      },
    }, null, 2);

    vi.mocked(readFile).mockResolvedValueOnce(initialContentWithoutScripts);
    const writeFileSpy = vi.mocked(writeFile);

    await modifyAngularJson();

    expect(writeFileSpy).toHaveBeenCalledWith(
      angularJsonPath,
      expect.stringContaining('"scripts": []'),
      'utf-8'
    );
  });

  it('should log an error if reading angular.json fails', async () => {
    const error = new Error('Read error');
    vi.mocked(readFile).mockRejectedValueOnce(error);
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await modifyAngularJson();

    expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Error updating angular.json:', error);
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('should log an error if writing to angular.json fails', async () => {
    vi.mocked(readFile).mockResolvedValueOnce(initialAngularJsonContent);
    const error = new Error('Write error');
    vi.mocked(writeFile).mockRejectedValueOnce(error);
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await modifyAngularJson();

    expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Error updating angular.json:', error);
  });
});

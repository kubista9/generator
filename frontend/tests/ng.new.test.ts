import { describe, it, expect, vi } from 'vitest';
import { execa } from 'execa';
import { ngNew } from '../src/processing/processes/ng.new'; 

vi.mock('execa', () => ({
  execa: vi.fn(),
}));

describe('ngNew', () => {
  const projectName = 'test-project';

  it('should call execa with correct parameters', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any);
    await ngNew(projectName);

    expect(execaMock).toHaveBeenCalledWith('ng', [
      'new',
      projectName,
      '--skip-install',
      '--style=scss',
      '--commit=true',
      '--routing=true',
    ], { stdio: 'inherit' });
  });

  it('should log success message when project creation succeeds', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await ngNew(projectName);

    expect(consoleLogSpy).toHaveBeenCalledWith('🎉 Project created successfully!');
  });

  it('should log error message when project creation fails', async () => {
    const execaMock = vi.mocked(execa);
    const errorMessage = new Error('Test error');
    execaMock.mockRejectedValueOnce(errorMessage);
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await ngNew(projectName);

    expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Error creating Angular project:', errorMessage);
  });
});

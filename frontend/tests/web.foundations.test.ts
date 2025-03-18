import { describe, it, expect, vi, beforeEach } from 'vitest';
import { execa } from 'execa';
import { installWebFoundations } from '../src/processing/processes/web.foundations'; 

vi.mock('execa', () => ({
  execa: vi.fn(),
}));

describe('installWebFoundations', () => {
  const webFoundationsVersion = '1.0.0';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call execa with correct parameters to install web foundations', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await installWebFoundations(webFoundationsVersion);

    expect(consoleLogSpy).toHaveBeenCalledWith('📦 Installing foundations from Depsit artifact feed...');
    expect(execaMock).toHaveBeenCalledWith('npm', ['install', `@depsit/uxdevacc-foundations@${webFoundationsVersion}`], { stdio: 'inherit' });
  });

  it('should log success message when foundations are installed successfully', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await installWebFoundations(webFoundationsVersion);

    expect(consoleLogSpy).toHaveBeenCalledWith(`✅ Web foundations ${webFoundationsVersion} added successfully!`);
  });

  it('should log an error message if installation fails', async () => {
    const execaMock = vi.mocked(execa);
    const error = new Error('Install error');
    execaMock.mockRejectedValueOnce(error);
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await installWebFoundations(webFoundationsVersion);

    expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Error installing web foundations:', error);
  });
});

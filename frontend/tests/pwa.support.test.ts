import { describe, it, expect, vi, beforeEach } from 'vitest';
import { execa } from 'execa';
import { installPwaSupport } from '../src/processing/processes/pwa.support';

vi.mock('execa', () => ({
  execa: vi.fn(),
}));

describe('installPwaSupport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call execa with correct parameters to add PWA support', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await installPwaSupport();

    expect(consoleLogSpy).toHaveBeenCalledWith('🌐 Adding PWA support...');
    expect(execaMock).toHaveBeenCalledWith('ng', ['add', '@angular/pwa'], { stdio: 'inherit' });
  });

  it('should log success message when PWA support is added successfully', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await installPwaSupport();

    expect(consoleLogSpy).toHaveBeenCalledWith('✅ PWA support added successfully!');
  });

  it('should log an error message if adding PWA support fails', async () => {
    const execaMock = vi.mocked(execa);
    const error = new Error('PWA install error');
    execaMock.mockRejectedValueOnce(error);
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await installPwaSupport();

    expect(consoleErrorSpy).toHaveBeenCalledWith('❌ An error occurred while adding PWA support');
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });
});

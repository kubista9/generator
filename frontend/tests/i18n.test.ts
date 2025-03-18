import { describe, it, expect, vi, beforeEach } from 'vitest';
import { execa } from 'execa';
import { installI18nSupport } from '../src/processing/processes/i18n';

vi.mock('execa', () => ({
  execa: vi.fn(),
}));

describe('installI18nSupport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should add i18n support by calling "ng add @angular/localize"', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any).mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await installI18nSupport();

    expect(consoleLogSpy).toHaveBeenCalledWith('🌐 Adding i18n support...');
    expect(execaMock).toHaveBeenCalledWith('ng', ['add', '@angular/localize'], { stdio: 'inherit' });
  });

  it('should call "ng extract-i18n" to extract translations', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any).mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await installI18nSupport();

    expect(execaMock).toHaveBeenCalledWith('ng', ['extract-i18n'], { stdio: 'inherit' });
    expect(consoleLogSpy).toHaveBeenCalledWith('✅ Internationalization (i18n) support added successfully!');
  });

  it('should log an error message if an error occurs', async () => {
    const execaMock = vi.mocked(execa);
    const error = new Error('Test error');
    execaMock.mockRejectedValueOnce(error);
    const consoleErrorSpy = vi.spyOn(console, 'error');
    await installI18nSupport();

    expect(consoleErrorSpy).toHaveBeenCalledWith('❌ An error occurred while adding i18n support');
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });
});

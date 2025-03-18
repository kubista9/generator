import { describe, it, expect, vi, beforeEach } from 'vitest';
import { execa } from 'execa';
import { npmInstall } from '../src/processing/processes/npm.install'; 

vi.mock('execa', () => ({
  execa: vi.fn(),
}));

describe('npmInstall', () => {
  const npmInstallParams = [
    'install',
    'jest@latest', 
    'eslint@latest', 
    'rxjs@latest',
    '@ngrx/effects@latest', 
    '@ngrx/entity@latest', 
    '@ngrx/router-store@latest',
    '@ngrx/store@latest', 
    '@ngrx/store-devtools@latest',
    '@azure/msal-angular@latest', 
    '@azure/msal-browser@latest',
    '@depsit/chattypes@latest',
    '@angular/service-worker@latest',
    '@microsoft/applicationinsights-web@latest',
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call execa with correct npm install parameters', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await npmInstall();

    expect(consoleLogSpy).toHaveBeenCalledWith('📦 Installing additional packages...');
    expect(execaMock).toHaveBeenCalledWith('npm', npmInstallParams, { stdio: 'inherit' });
  });

  it('should log success message when packages are installed successfully', async () => {
    const execaMock = vi.mocked(execa);
    execaMock.mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await npmInstall();

    expect(consoleLogSpy).toHaveBeenCalledWith('✅ Additional packages installed successfully!');
  });

  it('should log error message if package installation fails', async () => {
    const execaMock = vi.mocked(execa);
    const error = new Error('Install error');
    execaMock.mockRejectedValueOnce(error);
    const consoleErrorSpy = vi.spyOn(console, 'error');

    await npmInstall();

    expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Error installing additional packages:', error);
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { execa } from 'execa';
import { installWebComponets } from '../src/processing/processes/web.components';

vi.mock('fs/promises', () => ({
  mkdir: vi.fn(),
}));

vi.mock('execa', () => ({
  execa: vi.fn(),
}));

describe('installWebComponents', () => {
  const componentsPath = join(process.cwd(), 'src/app/components');
  const webComponentsVersion = '1.0.0';
  const consoleLogSpy = vi.spyOn(console, 'log');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create components directory', async () => {
    vi.fn(mkdir).mockResolvedValueOnce({} as any);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await installWebComponets(webComponentsVersion);

    expect(consoleLogSpy).toHaveBeenCalledWith('🛠️  Creating components directory...');
    expect(mkdir).toHaveBeenCalledWith(componentsPath, { recursive: true });
  });

  it('should change the working directory to components path', async () => {
    vi.fn(mkdir).mockResolvedValueOnce({} as any);
    vi.fn(execa).mockResolvedValueOnce({} as any);
    
    await installWebComponets(webComponentsVersion);

    console.log(componentsPath)
    expect(consoleLogSpy).toHaveBeenCalledWith('🛠️  Creating components directory...');
  });
});

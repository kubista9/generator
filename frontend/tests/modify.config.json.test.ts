import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFile, writeFile } from 'fs/promises';
import { modifyConfigDockerJson } from '../src/processing/processes/modify.config.json';
import path from 'path';

vi.mock('fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
}));

describe('modifyConfigDockerJson', () => {
  const tenantId = 'test-tenant-id';
  const clientId = 'test-client-id';
  const configDockerJsonPath = path.normalize(`${process.cwd()}/config.docker.json`);
  const initialConfigContent = JSON.stringify({
    msalConfig: {
      clientId: '',
      authority: '',
    },
  }, null, 2);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should read and update config.docker.json with correct msalConfig values', async () => {
    vi.mocked(readFile).mockResolvedValueOnce(initialConfigContent);
    const writeFileSpy = vi.mocked(writeFile);
    const consoleLogSpy = vi.spyOn(console, 'log');

    await modifyConfigDockerJson(tenantId, clientId);

    expect(readFile).toHaveBeenCalledWith(configDockerJsonPath, 'utf-8');
    expect(writeFileSpy).toHaveBeenCalledWith(
      configDockerJsonPath,
      JSON.stringify(
        {
          msalConfig: {
            clientId: clientId,
            authority: `https://login.microsoftonline.com/${tenantId}`,
          },
        },
        null,
        2
      ),
      'utf-8'
    );
    expect(consoleLogSpy).toHaveBeenCalledWith('✅ config.docker.json updated successfully!');
  });
});

import { ConfigService } from './config.service';

export function initConfiguration(configService: ConfigService) {
  return () => configService.init();
}
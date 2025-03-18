import { ConfigService } from '../config/config.service';
import {
  initMSALConfig,
  initMSALGuardConfig,
  initMSALInterceptorConfig,
} from './msal.initializers';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalService,
  MsalInterceptor,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';

export const AUTH_PROVIDERS = [
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  {
    provide: MSAL_GUARD_CONFIG,
    useFactory: initMSALGuardConfig,
    deps: [ConfigService],
  },
  {
    provide: MSAL_INSTANCE,
    useFactory: initMSALConfig,
    deps: [ConfigService],
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: initMSALInterceptorConfig,
    deps: [ConfigService],
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,
  },
];
import {
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import { ConfigService } from '../config/config.service';
import { MsalCookieStrategy } from '../../enums/msal-cookie-strategy.enum';
import { MsalProtectedResource } from '../config/config.types';

export const initMSALConfig = (
  configService: ConfigService
): IPublicClientApplication => {
  const msalConfig = configService.getConfig().msalConfig;
  const isIE =
    window.navigator.userAgent.indexOf('MSIE ') > -1 ||
    window.navigator.userAgent.indexOf('Trident/') > -1;
  const storeCookie =
    msalConfig.cookieStrategy === MsalCookieStrategy.Full ||
    (isIE && msalConfig.cookieStrategy === MsalCookieStrategy.OnlyIE);

  return new PublicClientApplication({
    auth: {
      clientId: msalConfig.clientId,
      redirectUri: msalConfig.redirectUri,
      authority: msalConfig.authority,
    },
    cache: {
      cacheLocation: msalConfig.cacheStrategy,
      storeAuthStateInCookie: storeCookie,
    },
    system: {
      loggerOptions: {
        loggerCallback: (logLevel: LogLevel, message: string) => {
          if (msalConfig.logLevel === logLevel) {
            console.log(message);
          }
        },
        logLevel: msalConfig.logLevel,
        piiLoggingEnabled: false,
      },
    },
  });
};

export const initMSALGuardConfig = (
  configService: ConfigService
): MsalGuardConfiguration => {
  const msalConfig = configService.getConfig().msalConfig;

  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: msalConfig.authenticationScopes,
    },
  };
};

export const initMSALInterceptorConfig = (
  configService: ConfigService
): MsalInterceptorConfiguration => {
  const msalConfig = configService.getConfig().msalConfig;
  const protectedResourceMap = new Map<string, string[]>();

  msalConfig.protectedResources.forEach(
    (protectedResource: MsalProtectedResource) =>
      Object.keys(protectedResource).forEach((key: string) =>
        protectedResourceMap.set(key, protectedResource[key])
      )
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
};

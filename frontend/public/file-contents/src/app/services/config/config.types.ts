import { MsalCookieStrategy } from '../../enums/msal-cookie-strategy.enum';
import {
  LogLevel,
  BrowserCacheLocation,
  InteractionType,
} from '@azure/msal-browser';

export interface Configuration {
  mock?: boolean;
  apiUrl: string;
  apiGraphUrl: string;
  collibraUrl?: string;
  cacheLocation: string;
  instrumentationKey: string;
  msalConfig: MsalConfiguration;
}

export interface MsalConfiguration {
  authenticationScopes: string[];
  authority: string;
  cacheStrategy: BrowserCacheLocation;
  interactionType: InteractionType;
  clientId: string;
  cookieStrategy: MsalCookieStrategy;
  logLevel: LogLevel;
  postLogoutRedirectUri: string;
  protectedResources: MsalProtectedResource[];
  redirectUri: string;
}

export interface MsalProtectedResource {
  [endpoint: string]: string[];
}
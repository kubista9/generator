import { EventMessage, EventType, LogLevel } from '@azure/msal-browser';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { ConfigService } from './services/config/config.service';
import { Subject, filter, takeUntil } from 'rxjs';
import { setMsalConfig } from '@depsit/chattypes';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})

export class AppComponent {
  title = 'Kickstart template';
  private readonly _destroying$ = new Subject<null>();

  constructor(
    private msalService: MsalService,
    private broadcasrService: MsalBroadcastService,
    private configService: ConfigService
  ) {
    this.broadcasrService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.HANDLE_REDIRECT_END
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((_: EventMessage) => {
        this.configService.whenReady(() => {
          const config = this.configService.getConfig();
          let account = undefined;
          const accounts = this.msalService.instance.getAllAccounts();
          if (accounts.length > 0) {
            account = accounts[0];
          }
          setMsalConfig(
            {
              auth: {
                clientId: config.msalConfig.clientId,
                authority: config.msalConfig.authority,
                redirectUri: config.msalConfig.redirectUri,
              },
              cache: {
                cacheLocation: 'sessionStorage',
                storeAuthStateInCookie: false,
                secureCookies: false,
              },
              system: {
                loggerOptions: {
                  logLevel: LogLevel.Error,
                  loggerCallback: (
                    level: LogLevel,
                    message: string,
                    containsPii: boolean
                  ) => {
                    if (containsPii) {
                      return;
                    }
                    switch (level) {
                      case LogLevel.Error:
                        console.error(message);
                        return;
                      case LogLevel.Info:
                        console.info(message);
                        return;
                      case LogLevel.Verbose:
                        console.debug(message);
                        return;
                      case LogLevel.Warning:
                        console.warn(message);
                        return;
                    }
                  },
                  piiLoggingEnabled: false,
                },
              },
            },
            account
          );
        });
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(null);
    this._destroying$.complete();
  }
}

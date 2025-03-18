import { SideMenuComponent } from './components/side-menu/side.menu.component';
import { initConfiguration } from './services/config/config.initializer';
import { HeaderComponent } from './components/header/header.component';
import { ConfigService } from './services/config/config.service';
import { MainLayoutComponent } from './layout/layout.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AUTH_PROVIDERS } from './services/auth/auth.config';
import { userReducer } from './store/reducers/user.reducer';
import { HomeComponent } from './pages/home/home.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './store/effects/user.effects';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LogLevel } from '@azure/msal-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { routes } from './app.routes'; 
import '@depsit/uxdevacc-components';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  APP_INITIALIZER, isDevMode,
} from '@angular/core';

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SideMenuComponent,
    MainLayoutComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfiguration,
      deps: [ConfigService],
      multi: true,
    },
    ConfigService,
    ...AUTH_PROVIDERS,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({
      users: userReducer,
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      UserEffects,
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {} 
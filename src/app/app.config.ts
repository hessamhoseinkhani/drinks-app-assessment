import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {ConfigService} from "./_services/config.service";

function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

const appInitializerProvider = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [ConfigService],
    multi: true,
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    appInitializerProvider,
    provideRouter(routes),
    provideHttpClient()
  ]
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Services/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(withInterceptors([authInterceptor])),
    Location,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  importProvidersFrom(BrowserAnimationsModule)

  ]
};
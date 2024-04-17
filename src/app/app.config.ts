import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HashLocationStrategy,
  Location,
  LocationStrategy,
} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './Services/auth-interceptor';
// import { WinAuthInterceptor } from './Services/win-auth-interceptor.service';
import { JwtInterceptorService } from './Services/jwt-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    importProvidersFrom(BrowserAnimationsModule),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: WinAuthInterceptor, multi: true },
  ],
};

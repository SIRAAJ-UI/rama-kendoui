import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptorService } from './Services/jwt-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
    provideRouter(routes), 
              provideHttpClient(),
              Location, 
              {provide: LocationStrategy, useClass: HashLocationStrategy},
              {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
            ]
};

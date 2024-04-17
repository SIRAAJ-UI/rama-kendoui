import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add the JWT bearer token to the request headers
    request = request.clone({
      setHeaders: {
        Authorization:
          'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQVkFMU2VydmVyIiwiYXVkIjoicHZhbHNlcnZpY2V1c2VyIn0.Vnm2fPOVySUKWACcXglRKiuCSsREmeg8yDyK5tUdXxo',
      },
    });

    // Pass the request on to the next handler
    return next.handle(request);
  }
}
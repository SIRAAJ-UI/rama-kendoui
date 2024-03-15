import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.dev";


export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = environment.authToken;
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        authorization: token,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
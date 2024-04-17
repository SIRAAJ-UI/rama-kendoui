import { Injectable, Inject, InjectionToken, PLATFORM_ID } from "@angular/core";
import { environment } from "../../environments/environment.dev";
import { prop_char_tab_model } from "../../app/Models/property_characteristics.model";
import { Observable, Subject, pipe, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpRequest,
  HttpHandler,
  HttpXsrfTokenExtractor,
  HttpInterceptor,
  HttpBackend,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
  HttpParamsOptions,
} from "@angular/common/http";
import { map, retry, filter, scan, tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl: string = environment.BaseURL;
  private localUrl: string = environment.localDevBase;
  private baseCSAApi = "${this.baseUrl}/csa/api";

  constructor(private _http: HttpClient) {}

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return of(errorMessage);
  }

  ngOnDestroy() {}
}

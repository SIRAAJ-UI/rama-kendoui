import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// This service is used with try catch block to log any exceptions
@Injectable({
  providedIn: 'root',
})
export class ErrorLoggingService {
  constructor(private http: HttpClient) {}
  apiUrl = `${environment.ImproveBaseURL}/Errorlogging/LogException`;
  // applicationId is 10 for CSA, assume
  applicationId = 10;
  logError(
    logTypeId: number,
    customMessage: string
  ): Observable<any> {
    const errorData = {
      applicationId: this.applicationId,
      // TODO: Check error logging error log type id
      logTypeId: 1,
      customMessage: "Data retrival failure",
    };

    return this.http.post(this.apiUrl, errorData).pipe(
      catchError((error) => {
        console.error('Error Logging API request failed:', error);
        return throwError(() => error);
      })
    );
  }
}

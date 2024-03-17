import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorLogginService {

    constructor(private http: HttpClient) {

    }

    logError(apiUrl: string, applicationId: number, logTypeId: number, customMessage: string): Observable<any> {
        const erroData = {
            applicationId: applicationId,
            logTypeId: logTypeId,
            customMessage: customMessage
        }
        return this.http.post(apiUrl, erroData).pipe(
            catchError((error: any) => {
                console.log("Error Logging API request failed:", error);
                return throwError(error);
            }
        ));
    }

}
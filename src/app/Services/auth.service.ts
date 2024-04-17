import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: Implement in the future, default component should be adding a timed token
  // while injecting auth service
  // This is setup to use Windows Authentication on Default Page
  constructor(private http: HttpClient, private router: Router) {}
  isAuthenticated: boolean = false;
  authenticate(inToken: string): void {
    const token = localStorage.getItem('token');
    if (inToken === token) {
      this.isAuthenticated = true;
    }
    else {
      this.isAuthenticated = false;
    }
  }

  getToken(): Observable<string> {
    // hardcoded now for testing
    // const url = 'http://localhost:52060/api/GetToken';

    const url = environment.ImproveBaseURL + '/GetToken';
    return this.http.get(url, { responseType: 'text' });
  }

  // default expiration time is one hour (3600 sec)
  setToken(token: string, expirationTimeInSeconds: number = 3600): void {
    // Set token in local storage
    localStorage.setItem('token', token);

    // Calculate expiration time in milliseconds
    const expirationTimeInMillis = Date.now() + (expirationTimeInSeconds * 1000);
    
    // Set expiration time in local storage
    localStorage.setItem('tokenExpiration', expirationTimeInMillis.toString());

    // Set a timer to delete the token after expiration
    setTimeout(() => {
      this.clearToken();
    }, expirationTimeInSeconds * 1000);
  }

  clearToken(): void {
    // Remove token and expiration time from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Redirect to error page on 401 (Unauthorized)
      this.router.navigate(['/error']);
      return throwError(() => new Error('Unauthorized access'));
    } else {
      // Handle other errors (optional)
      // You can log the error message or display a generic error message to the user
      return throwError(() => new Error(error.message));
    }
  }
}

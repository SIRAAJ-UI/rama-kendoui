import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // TODO: Implement in the future, default component should be adding a timed token
  // while injecting auth service
  constructor() { }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;  
  }
}

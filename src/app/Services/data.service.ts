import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getPageTitleByCSAType(csaType: number): Observable<string> {
    // TODO: complete the function based on design doc principle
    const apiUrl = `getPageTitleByCSAType`; // Replace with actual API endpoint
    return this.http.get<string>(apiUrl);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl: string = environment.BaseURL;
  private baseCSAApi = '${this.baseUrl}/csa/api';
  constructor(private http: HttpClient) { }
  getPageTitleByCSAType(csaType: number): Observable<string> {
    // TODO: complete the function based on design doc principle
    const apiUrl = `getPageTitleByCSAType`; // Replace with actual API endpoint
    return this.http.get<string>(apiUrl);
  }
  getAnticipatedCodes(): Observable<any> {
    return this.http.get<any>(environment.localDevBase+'/csa/GetAnticipatedUseCodes');
    
    }
    getConditionAtSale(FieldId : number): Observable<any> {
      return this.http.get<any>(environment.localDevBase+'/common/GetFieldCode/'+FieldId);
    }
  getData(): Observable<any> {
    return this.http.get(`${this.baseCSAApi}/GetAnticipatedUseCodes`);
  }

  modReport() {
    // TODO: Use power bi api to mod built report from Visual Studio
  }
  
}

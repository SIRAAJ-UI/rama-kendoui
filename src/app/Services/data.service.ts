import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { MenuItem } from '../Models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private baseUrl: string = environment.localDevBase;
  private baseUrl: string = environment.localDevBase;
  private csaBaseUrl: string = environment.localBaseDevBase;

  constructor(private http: HttpClient ) { }
  GetPageTitleByCSAType(fieldId: number): Observable<string> {
    return new Observable<string>(observer => {
      this.http.get(this.baseUrl + '/csa/GetPageTitleByCSAType/' + fieldId, { responseType: 'text' }).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
  
  GetDataByImproveUrl(
    actionName: string,
    parameter: number | undefined = undefined
  ): Observable<any> {
    if (parameter != undefined) {
      return this.http.get<any>(
        `${this.baseUrl}/${actionName}/${parameter}`
      );
    }
    return this.http.get<any>(`${this.csaBaseUrl}/${actionName}`);
  }
  GetDataByUrl(
    actionName: string,
    parameter: number | undefined = undefined
  ): Observable<any> {
    if (parameter != undefined) {
      return this.http.get<any>(
        `${this.csaBaseUrl}/${actionName}/${parameter}`
      );
    }
    return this.http.get<any>(`${this.csaBaseUrl}/${actionName}`);
  }

  GetDataByJson(actionName: string, jsonData: any): Observable<any> {
    return this.http.get<any>(`${this.csaBaseUrl}/${actionName}`, jsonData);
  }
}

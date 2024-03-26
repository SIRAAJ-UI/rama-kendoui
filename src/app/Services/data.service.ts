import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { HttpParams } from '@angular/common/http';
import * as Model from '../core/models/csasalesinfo.model';
import * as Interfaces from '@csa/@core/interfaces/csasalesinfo.interface'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl: string = environment.BaseURL;
  private baseCSAApi = '${this.baseUrl}/csa/api';
  constructor(private http: HttpClient) { }
  getPageTitleByCSAType(csaType: number): Observable<string> {
    return new Observable<string>(observer => {
      this.http.get(environment.localDevBase + '/csa/GetPageTitleByCSAType/' + csaType, { responseType: 'text' }).subscribe(
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
  getAnticipatedCodes(): Observable<any> {
    
    return this.http.get<any>(environment.localDevBase + '/csa/GetAnticipatedUseCodes');

  }
  getConditionAtSale(FieldId: number): Observable<any> {
    
    return this.http.get<any>(environment.localDevBase + '/common/GetFieldCode/' + FieldId);
  }
  
  getSalesInfo(CSA_Id:number):Observable<any>{ 
    return this.http.get<any>(environment.localDevBase + '/csa/GetFullSaleInfo/' + CSA_Id);
  }
  getAllComments(CSA_Id:number):Observable<any>{
    // return this.http.get<any[]>('assets/comments.json')
    return this.http.get<any>(environment.localDevBase + '/csa/GetCSAComments/' + CSA_Id);  
  }

  saveCSASalesInfoTab(CISalesinfoModel: Interfaces.CISalesinfo): Observable<any> { 
    return this.http.post<any>( environment.localDevBase+'/csa/SaveCSASalesInfoTab',CISalesinfoModel);

 }
 saveCSAComments(CSAComments:Interfaces.Comments):Observable<any>{
  console.log(environment.localDevBase+'/csa/SaveCsaComments',CSAComments);
  return this.http.post<any>( environment.localDevBase+'/csa/SaveCsaComments',CSAComments);
 }
 updateCSAComments(CSAComments:Interfaces.Comments):Observable<any>{
  //  return of([CSAComments]);
  return this.http.post<any>( environment.localDevBase+'/csa/UpdateCsaComments',CSAComments);
 }

  // getData(): Observable<any> {
  //   return this.http.get(`${this.baseCSAApi}/GetAnticipatedUseCodes`);
  // }
  modReport() {
    // TODO: Use power bi api to mod built report from Visual Studio
  }

}

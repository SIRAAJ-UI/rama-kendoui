import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { HttpParams } from '@angular/common/http';
import { AnticipatedUseCodes, ConditionAtsales } from '../core/interfaces/csasalesinfo.interface';
import * as Model from '../core/models/csasalesinfo.model';

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
    if(environment.withoutAPI){
      const anticipatedUse = [];
      let anticipdateRecord:AnticipatedUseCodes;
      for(let i=0;i<5;i++){
        anticipdateRecord = new Model.AnticipatedUseCodes();
        anticipdateRecord.anticipateD_USE_CD = i;
        anticipdateRecord.usE_NAME = "Test"+i;
        anticipatedUse.push(anticipdateRecord);
      }
      return of(anticipatedUse);
    }
    return this.http.get<any>(environment.localDevBase + '/csa/GetAnticipatedUseCodes');

  }
  getConditionAtSale(FieldId: number): Observable<any> {
    if(environment.withoutAPI){
      const conditionAtSaleRecords = [];
      let conditionAtSales:ConditionAtsales;
      for(let i=0;i<5;i++){
        conditionAtSales = new Model.ConditionAtsales();
        conditionAtSales.cD_ID = `${i}`;
        conditionAtSales.cD_LONG_NAME = "Condition"+i;
        conditionAtSaleRecords.push(conditionAtSales);
      }
      return of(conditionAtSaleRecords);
    }
    return this.http.get<any>(environment.localDevBase + '/common/GetFieldCode/' + FieldId);
  }
  getData(): Observable<any> {
    return this.http.get(`${this.baseCSAApi}/GetAnticipatedUseCodes`);
  }

  modReport() {
    // TODO: Use power bi api to mod built report from Visual Studio
  }

}

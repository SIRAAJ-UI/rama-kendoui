import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  //http://assessord.acgov.org/csa/default.aspx?SessionID=99&CSAType=933&CSAID=17122&IEMode=E&WorkerID=PYX
  sessionId: string|null = '99';
  csaType: string|null = null;
  csaId: string|null = null;
  ieMode: string|null = null;
  workerId: string|null = null;
  leaseId: string|null = null;
  leasePropertyId: string|null = null;

  constructor() { }
  
}

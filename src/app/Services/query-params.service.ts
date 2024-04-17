import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class QueryParamsService {
  //http://assessord.acgov.org/csa/default.aspx?SessionID=99&CSAType=933&CSAID=17122&IEMode=E&WorkerID=PYX
  sessionId: string|undefined;
  csaType: number|undefined;
  csaId: number|undefined;
  ieMode: string|undefined;
  workerId: string|undefined;
  leaseId: string|undefined;
  leasePropertyId: string|undefined;
  constructor() { }
}

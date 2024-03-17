import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { DataService } from './data.service';
export class CISalesinfoModel {
  ANTICIPATED_USE_CD: number;
  PROP_USE_DETL: string;
  PCT_OWNER_OCCUP: string;
  BROKER_INVOLVED_FL: string;
  BUY_SELL_REL_FL:string;
  BUY_SELL_REL_DESC:string;
  PUR_PREDATE_BY_OPT:string;
  PREDATE_CONT_DATE: Date;
  PUR_PRED_CONT_SALE: string;
  COND_AT_SALE_CD:string;
  BENCHMARK_RATE_CD:string;
  SUPRV_APPROVED_FL:string;
}
@Injectable({
  providedIn: 'root'
})
export class CSASalesInfoService {
  
  public csaId: number;
  private csaFormGroup: any;
  constructor(private dataService: DataService) { }

  intializeFormObject(csaFormGroup: any) {
    this.csaFormGroup = csaFormGroup;
   
  }
  
  onSave() {
    console.log(this.csaFormGroup);
    console.log(this.csaFormGroup.controls['anticipatedUse'].value);
    let salesInfoTab = {
      ANTICIPATED_USE_CD: this.csaFormGroup.controls['anticipatedUse'].value,
      PROP_USE_DETL: this.csaFormGroup.controls['details'].value,
    PCT_OWNER_OCCUP: this.csaFormGroup.controls['ownerOccupied'].value,
    BROKER_INVOLVED_FL: this.csaFormGroup.controls['brokerInvolved'].value,
    BUY_SELL_REL_FL:this.csaFormGroup.controls['buyerSellerRelationship'].value,
    BUY_SELL_REL_DESC:this.csaFormGroup.controls['ifBuyerSellerRelationship'].value,
    PUR_PREDATE_BY_OPT:this.csaFormGroup.controls['purchasePredateBy'].value,
    PREDATE_CONT_DATE: this.csaFormGroup.controls['contractDate'].value,
    PUR_PRED_CONT_SALE: this.csaFormGroup.controls['anticipatedUse'].value,
    COND_AT_SALE_CD:this.csaFormGroup.controls['conditionAtSales'].value,
    BENCHMARK_RATE_CD:this.csaFormGroup.controls['brokerInvolved'].value,
    SUPRV_APPROVED_FL:this.csaFormGroup.controls['supervisorApproved'].value,
    };
    this.dataService.saveRecord(salesInfoTab);
  }
}

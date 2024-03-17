import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { DataService } from './data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';
import * as Model from '../core/models/csasalesinfo.model';
import * as Interfaces from '../core/interfaces/csasalesinfo.interface';
import { Observable, Subject, of } from 'rxjs';



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
  
  public salesInfoForm: any;
  public csaId: number;
  private csaFormGroup: any;
  public commentText: string;
  public comments: Array<Model.Comments> = [];

  constructor(private dataService: DataService,private validatorService: ValidatorService) { 
    this.initializeCSASalesForm();
  }

  initializeCSASalesForm() {
    this.salesInfoForm = new FormGroup({
        anticipatedUse: new FormControl('', [Validators.required]),
        details: new FormControl(null, [Validators.required, this.validatorService.validateMaxLength('details', 10)]),
        supervisorApproved: new FormControl(null),
        benchmarkRatings: new FormControl('', [Validators.required, this.validatorService.validateMaxLength('benchmarkRatings', 10)]),
        ownerOccupied: new FormControl('', [Validators.required, this.validatorService.validateMaxLength('ownerOccupied', 10)]),
        brokerInvolved: new FormControl(null, [Validators.required]),
        buyerSellerRelationship: new FormControl(null, [Validators.required]),
        ifBuyerSellerRelationship: new FormControl(null, [Validators.required, this.validatorService.validateMaxLength('ifBuyerSellerRelationship', 10)]),
        purchasePredatedBy: new FormControl(null, [Validators.required]),
        contractDate: new FormControl(null, [Validators.required]),
        conditionAtSales: new FormControl(null, [Validators.required]),
    });
};
  
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
//   setCSAData(data: any): void {
//     this.casId = data.CSA_ID;
//     this.seqNum = data.SEQ_NUM;
//     this.commentText = data.COMMENT_TEXT;
//     this.entryTs = data.ENTRY_TS;
//     this.entryWorker = data.ENTRY_WORKER;
//     this.updateTs = data.UPDAte_TS;
//     this.updateWorker = data.UPDATE_WORKER;
// };

salesInfoFormValidation(): Array<string> {
    return this.validatorService.validateForm(this.salesInfoForm.controls);
};

addComments(addComment: Interfaces.Comments):Observable<Array<Model.Comments>> {
    console.log(this.comments.length);
    addComment.comm_ID = this.comments.length++;
    this.comments[addComment.comm_ID] = addComment;
    return of(this.comments)
};

updateComments(editedComment: Interfaces.Comments):Observable<Array<Model.Comments>> {
    this.comments.forEach( (comment:Interfaces.Comments) => {
        if(comment.comm_ID === editedComment.comm_ID) {
            comment.comm_Text = editedComment.comm_Text;
        }
    });
    return of(this.comments)
};

getAllComments():Observable<Array<Model.Comments>> {
    let comment: Interfaces.Comments;
    for (let i = 0; i < 5; i++) {
        comment = new Model.Comments();
        comment.comm_ID = i;
        comment.comm_Text = "Comments" + i;
        this.comments.push(comment)
    }
    return of(this.comments)
};
}

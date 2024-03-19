import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';
import * as Model from '../core/models/csasalesinfo.model';
import * as Interfaces from '../core/interfaces/csasalesinfo.interface';
import { Observable, debounceTime, distinctUntilChanged, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CsaSalesInfoService {

    public salesInfoForm: any;
    public propCharForm:any;
    public csaId: number;
    public commentText: string;
    public comments: Array<Model.Comments> = [];

    constructor(private dataService: DataService, private validatorService: ValidatorService) {
        this.initializeCSASalesForm();
        this.listenToChange();
        this.getSalesinfo();
    }

    initializeCSASalesForm() {

        this.salesInfoForm = new FormGroup({
            ANTICIPATED_USE_CD: new FormControl(null, [this.validatorService.validateAnticipatedUse()]),
            PROP_USE_DETL: new FormControl(null, [this.validatorService.validateMaxLength(30)]),
            PCT_OWNER_OCCUP: new FormControl('', [this.validatorService.validateMaxLength(3),this.validatorService.customNumberValidator()]),
            BROKER_INVOLVED_FL: new FormControl(null, [this.validatorService.validateMaxLength(1)]),
            BUY_SELL_REL_FL: new FormControl(null, [this.validatorService.validateMaxLength(1)]),
            BUY_SELL_REL_DESC: new FormControl(null, []),
            PUR_PREDATE_BY_OPT: new FormControl(null, [this.validatorService.validateMaxLength(10)]),
            PREDATE_CONT_DATE: new FormControl(null, []),
            COND_AT_SALE_CD: new FormControl(null, [this.validatorService.validateMaxLength(1)]),
            SUPRV_APPROVED_FL: new FormControl(null, [this.validatorService.validateMaxLength(10)]),
            BENCHMARK_RATE_CD: new FormControl('A', [this.validatorService.validateMaxLength(1)]),
        });
        this.propCharForm = new FormGroup({


        });
    };
    getSalesinfo()
    {
       
      this.dataService.getSalesInfo(17149).subscribe(data => {

       var salesinfo = data[0];
      console.log('salesinfo details'+salesinfo.suprv_approved_fl);
       this.salesInfoForm.patchValue({
        ANTICIPATED_USE_CD: salesinfo.anticipated_use_cd,
        PROP_USE_DETL: salesinfo.csa_prop_use_detl,
        PCT_OWNER_OCCUP: salesinfo.pct_owner_occup,
        BROKER_INVOLVED_FL: salesinfo.broker_involved_fl,
        BUY_SELL_REL_FL: salesinfo.buy_sell_rel_fl,
        BUY_SELL_REL_DESC: salesinfo.buy_sell_rel_desc,
        PUR_PREDATE_BY_OPT: salesinfo.pur_predate_by_opt,
        PREDATE_CONT_DATE: new Date(salesinfo.predate_cont_date),
        cD_ID: salesinfo.cond_at_sale_cd,
        SUPRV_APPROVED_FL: salesinfo.suprv_approved_fl,
        BENCHMARK_RATE_CD: salesinfo.benchmark_rate_cd,
     });
     

    }); 
    console.log('sales info controls'+this.salesInfoForm.controls);

    } 
    private listenToChange() {
        const controls = this.salesInfoForm.controls;
        controls.BUY_SELL_REL_DESC.valueChanges
            .pipe(debounceTime(400), distinctUntilChanged())
            .subscribe((buy_sell_rel_desc: string) => {
                const controlValue = this.salesInfoForm.controls.BUY_SELL_REL_FL.value;
                if (!controlValue) {
                    if (buy_sell_rel_desc === "") {
                        controls.BUY_SELL_REL_DESC.setErrors(null)
                    } else {
                        controls.BUY_SELL_REL_DESC.setErrors({ required: { message: "Do not specify Buyer/Seller relationship if none is indicated." } })
                    }
                } else {
                    if (controlValue === 1) {
                        if ((!buy_sell_rel_desc) || (buy_sell_rel_desc === "")) {
                            controls.BUY_SELL_REL_DESC.setErrors({ required: { message: "Buyer/Seller relationship description is required." } })
                        } else {
                            controls.BUY_SELL_REL_DESC.setErrors(null);
                        }
                    }
                    if (controlValue === 2) {
                        if (buy_sell_rel_desc !== "") {
                            controls.BUY_SELL_REL_DESC.setErrors({ required: { message: "Do not specify Buyer/Seller relationship if none is indicated." } })
                        } else {
                            controls.BUY_SELL_REL_DESC.setErrors(null);
                        }
                    }
                }
            });

        controls.BUY_SELL_REL_FL.valueChanges
            .subscribe((buy_sell_rel_fl: number) => {
                const controlValue = this.salesInfoForm.controls.BUY_SELL_REL_DESC.value;
                if (buy_sell_rel_fl === 1) {
                    if ((!controlValue) || (controlValue === "")) {
                        controls.BUY_SELL_REL_DESC.setErrors({ required: { message: "Buyer/Seller relationship description is required." } })
                    } else {
                        controls.BUY_SELL_REL_DESC.setErrors(null);
                    }
                }
                if (buy_sell_rel_fl === 2) {

                    if (controlValue) {
                        controls.BUY_SELL_REL_DESC.setErrors({ required: { message: "Do not specify Buyer/Seller relationship if none is indicated." } })
                    } else {
                        controls.BUY_SELL_REL_DESC.setErrors(null)

                    }
                }
            });

        controls.COND_AT_SALE_CD.valueChanges
        .subscribe((isChecked: boolean) => {
            const controlValue = this.salesInfoForm.controls.PREDATE_CONT_DATE.value;
            if(isChecked){
                if(!controlValue){
                    controls.PREDATE_CONT_DATE.setErrors({ required: { message: "Contract date is required." } })
                }
            }
        });
    };

    GetPageTitleByCSAType(csaType: number):Observable<any> {
        return this.dataService.getPageTitleByCSAType(csaType)
    }
    saveCSASalesForm() {
        let CISalesinfo: any = new Model.CISalesinfo()
        for (let [key, control] of Object.entries(this.salesInfoForm.controls)) {
            CISalesinfo[key] = this.salesInfoForm.get(key).value;
        }
       // this.dataService.saveRecord(CISalesinfo);
    };

    

    salesInfoFormValidation(): Array<string> {
        return this.validatorService.validateForm(this.salesInfoForm.controls);
    };

    addComments(addComment: Interfaces.Comments): Observable<Array<Model.Comments>> {
        addComment.comm_ID = this.comments.length++;
        this.comments[addComment.comm_ID] = addComment;
        return of(this.comments)
    };

    updateComments(editedComment: Interfaces.Comments): Observable<Array<Model.Comments>> {
        this.comments.forEach((comment: Interfaces.Comments) => {
            if (comment.comm_ID === editedComment.comm_ID) {
                comment.comm_Text = editedComment.comm_Text;
            }
        });
        return of(this.comments)
    };

    getAllComments(): Observable<Array<Model.Comments>> {
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

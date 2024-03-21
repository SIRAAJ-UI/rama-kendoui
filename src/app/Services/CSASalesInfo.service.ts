import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';
import * as Model from '../core/models/csasalesinfo.model';
import * as Interfaces from '../core/interfaces/csasalesinfo.interface';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CsaSalesInfoService {

    public salesInfoForm: any;
    public csaId: number;
    public commentText: string;
    public comments: Array<Model.Comments> = [];
    public CsaDocument: Subject<Interfaces.CsaDocument>;
    public disabledTabs: Subject<any>;

    constructor(private dataService: DataService, private validatorService: ValidatorService) {
        this.CsaDocument = new Subject();
        this.disabledTabs = new Subject();
        this.initializeCSASalesForm();
        this.listenToChange();
        this.getSalesinfo();
    }

    initializeCSASalesForm() {
        this.salesInfoForm = new FormGroup({
            ANTICIPATED_USE_CD: new FormControl(null, [this.validatorService.validateAnticipatedUse()]),
            PROP_USE_DETL: new FormControl(null, [this.validatorService.validateMaxLength(30)]),
            PCT_OWNER_OCCUP: new FormControl('', [this.validatorService.validateMaxLength(3), this.validatorService.customNumberValidator()]),
            BROKER_INVOLVED_FL: new FormControl(null, [this.validatorService.validateMaxLength(1)]),
            BUY_SELL_REL_FL: new FormControl(null, [this.validatorService.validateMaxLength(1)]),
            BUY_SELL_REL_DESC: new FormControl(null, []),
            PUR_PREDATE_BY_OPT: new FormControl(null, [this.validatorService.validateMaxLength(10)]),
            PUR_PRED_CONT_SALE: new FormControl(null, [this.validatorService.validateMaxLength(10)]),
            PREDATE_CONT_DATE: new FormControl(null, []),
            COND_AT_SALE_CD: new FormControl(null, [this.validatorService.validateMaxLength(1)]),
            SUPRV_APPROVED_FL: new FormControl(null, [this.validatorService.validateMaxLength(10)]),
            BENCHMARK_RATE_CD: new FormControl('A', [this.validatorService.validateMaxLength(1)]),
        });
    };

    getSalesinfo() {
        this.dataService.getSalesInfo(17149).subscribe((data: Array<Interfaces.CISalesinfo>) => {
            const salesinfo = data[0];
            const csaDocument: Interfaces.CsaDocument = new Model.CsaDocument();
            csaDocument.doc_prefix = salesinfo.doC_PREFIX + salesinfo.doC_SERIES;
            csaDocument.event_ts = new Date(salesinfo.evenT_TS);
            csaDocument.buyer_name = salesinfo.mailinG_NAME;
            csaDocument.seller_name = salesinfo.mailinG_NAME;
            csaDocument.apn = salesinfo.prinT_PARCEL;
            csaDocument.usecode = salesinfo.usE_CD;
            csaDocument.use = salesinfo.usE_NAME;
            csaDocument.address = salesinfo.address + salesinfo.situS_CITY_NAME + salesinfo.situS_STATE + salesinfo.ziP_CD;

            csaDocument.apncount = salesinfo.doC_PARCEL_CNT;
            csaDocument.indpurprice = salesinfo.inD_PUR_PRICE;
            csaDocument.adjsalesprice = salesinfo.adJ_SALES_PRICE;
            csaDocument.transtaxprice = salesinfo.traN_TAX_PRICE;

            this.CsaDocument.next(csaDocument);
            this.salesInfoForm.patchValue({
                ANTICIPATED_USE_CD: salesinfo.anticipateD_USE_CD,
                PROP_USE_DETL: salesinfo.csA_PROP_USE_DETL,
                PCT_OWNER_OCCUP: salesinfo.pcT_OWNER_OCCUP,
                BROKER_INVOLVED_FL: salesinfo.brokeR_INVOLVED_FL,
                BUY_SELL_REL_FL: salesinfo.buY_SELL_REL_FL,
                BUY_SELL_REL_DESC: salesinfo.buY_SELL_REL_DESC,
                PUR_PREDATE_BY_OPT: salesinfo.puR_PREDATE_BY_OPT,
                PREDATE_CONT_DATE: salesinfo.predatE_CONT_DATE,
                COND_AT_SALE_CD: salesinfo.conD_AT_SALE_CD,
                SUPRV_APPROVED_FL: salesinfo.suprV_APPROVED_FL,
                BENCHMARK_RATE_CD: salesinfo.benchmarK_RATE_CD
            });
        });
        console.log('sales info controls' + this.salesInfoForm.controls);
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
                if (isChecked) {
                    if (!controlValue) {
                        controls.PREDATE_CONT_DATE.setErrors({ required: { message: "Contract date is required." } })
                    }
                }
            });

        controls.PCT_OWNER_OCCUP.valueChanges
            .subscribe((value: number) => {
               if(value === 100){
                    this.disabledTabs.next(true);
               } else {
                    this.disabledTabs.next(false);
               }
            });
    };

    GetPageTitleByCSAType(csaType: number): Observable<any> {
        return this.dataService.getPageTitleByCSAType(csaType)
    };

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
        addComment.seQ_NUM = this.comments.length++;
        this.comments[addComment.seQ_NUM] = addComment;
        return of(this.comments)
    };

    updateComments(editedComment: Interfaces.Comments): Observable<Array<Model.Comments>> {
        this.comments.forEach((comment: Interfaces.Comments) => {
            if (comment.seQ_NUM === editedComment.seQ_NUM) {
                comment.commenT_TEXT = editedComment.commenT_TEXT;
            }
        });
        return of(this.comments)
    };

    getAllComments(): Observable<Array<Model.Comments>> {
        // let comment: Interfaces.Comments;
        // for (let i = 0; i < 5; i++) {
        //     comment = new Model.Comments();
        //     comment.comm_ID = i;
        //     comment.comm_Text = "Comments" + i;
        //     this.comments.push(comment)
        // }
        // return of(this.comments)
        console.log('comments' + this.dataService.getAllComments(17149));
        return this.dataService.getAllComments(17149);
    };
}

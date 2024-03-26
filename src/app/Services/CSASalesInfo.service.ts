import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';
import * as Model from '../core/models/csasalesinfo.model';
import * as Interfaces from '../core/interfaces/csasalesinfo.interface';
import { BehaviorSubject, Observable, Subject, catchError, debounceTime, distinctUntilChanged, map, of } from 'rxjs';


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
            PREDATE_CONT_DATE: new FormControl(''),
            COND_AT_SALE_CD: new FormControl(null, [this.validatorService.validateMaxLength(1)]),
            SUPRV_APPROVED_FL: new FormControl(null, [this.validatorService.validateMaxLength(10)]),
            BENCHMARK_RATE_CD: new FormControl('A', [this.validatorService.validateMaxLength(1)]),
            CSA_DOCUMENT: new FormControl()
        });
    };

    getSalesinfo() {
        this.dataService.getSalesInfo(17149).subscribe((data: Array<Interfaces.CISalesinfo>) => {
            this.bindedToSaleInfo(data[0]);
        }); 
    }
     
    private bindedToSaleInfo(record: Interfaces.CISalesinfo){
        const salesinfo = record;
        const csaDocument: Interfaces.CsaDocument = new Model.CsaDocument();
        csaDocument.doc_prefix = salesinfo.doC_PREFIX 
        csaDocument.doc_series= salesinfo.doC_SERIES;
        csaDocument.entry_ts=salesinfo.entrY_TS;
        csaDocument.entry_worker=salesinfo.entrY_WORKER;
        csaDocument.property_id=salesinfo.propertY_ID;
        csaDocument.ROW_CHANGE_TS=salesinfo.roW_CHANGE_TS;
        csaDocument.event_ts = new Date(salesinfo.evenT_TS);
        csaDocument.buyer_name = salesinfo.mailinG_NAME;
        csaDocument.seller_name = salesinfo.mailinG_NAME;
        csaDocument.apn = salesinfo.prinT_PARCEL;
        csaDocument.use_id = salesinfo.usE_CD;
        csaDocument.use = salesinfo.usE_NAME;
        csaDocument.address = salesinfo.address + salesinfo.situS_CITY_NAME + salesinfo.situS_STATE + salesinfo.ziP_CD;

        csaDocument.situS_CITY_NAME =  salesinfo.situS_CITY_NAME;
        csaDocument.situS_STATE = salesinfo.situS_STATE;
        csaDocument.ziP_CD =  salesinfo.ziP_CD;



        csaDocument.apncount = salesinfo.doC_PARCEL_CNT;
        csaDocument.indpurprice = salesinfo.inD_PUR_PRICE;
        csaDocument.adjsalesprice = salesinfo.adJ_SALES_PRICE;
        csaDocument.transtaxprice = salesinfo.traN_TAX_PRICE;
        csaDocument.toT_BUILDING_AREA=salesinfo.toT_BUILDING_AREA;
        csaDocument.toT_LOT_SIZE=salesinfo.toT_LOT_SIZE;
        csaDocument.toT_NET_RENT_AREA=salesinfo.toT_NET_RENT_AREA;
        csaDocument.csa_id=17149;
        csaDocument.csa_type=933;

        this.CsaDocument.next(csaDocument);

        this.salesInfoForm.patchValue({
            ANTICIPATED_USE_CD: salesinfo.anticipateD_USE_CD,
            PROP_USE_DETL: salesinfo.csA_PROP_USE_DETL,
            PCT_OWNER_OCCUP: salesinfo.pcT_OWNER_OCCUP,
            BROKER_INVOLVED_FL: salesinfo.brokeR_INVOLVED_FL,
            BUY_SELL_REL_FL: salesinfo.buY_SELL_REL_FL,
            BUY_SELL_REL_DESC: salesinfo.buY_SELL_REL_DESC,
            PUR_PREDATE_BY_OPT: salesinfo.puR_PREDATE_BY_OPT,
            PREDATE_CONT_DATE: new Date(salesinfo.predatE_CONT_DATE),
            COND_AT_SALE_CD: salesinfo.conD_AT_SALE_CD,
            SUPRV_APPROVED_FL: salesinfo.suprV_APPROVED_FL,
            BENCHMARK_RATE_CD: salesinfo.benchmarK_RATE_CD,
            CSA_DOCUMENT: csaDocument
        });
    };
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
                const controlValue = this.salesInfoForm.controls.COND_AT_SALE_CD.value;
                if (isChecked) {
                    if (!controlValue) {
                        controls.COND_AT_SALE_CD.setErrors({ required: { message: "Contract date is required." } })
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
        this.progressBarService.showProgress(10,'red');
        let CISalesinfo: any = new Model.CISalesinfo();
         for (let [key, control] of Object.entries(this.salesInfoForm.controls)) {
            CISalesinfo[key] = this.salesInfoForm.get(key).value;
        }  
         this.dataService.saveCSASalesInfoTab(CISalesinfo).subscribe(result =>{
            console.log("result");
            //this.salesInfoForm.patch(result);
         },
            error=> {console.log(error)});
    };

    salesInfoFormValidation(): Array<string> {
        return this.validatorService.validateForm(this.salesInfoForm.controls);
    };
    addComments(addComment: Interfaces.Comments): Observable<Array<Model.Comments>> {
        return this.dataService.saveCSAComments(addComment).pipe(
            map((comments: Array<Interfaces.Comments>) =>  {
                return comments;
            }), // Assuming comments are in a 'comments' property
            catchError(error => {
                console.error('Error loading comments:', error);
                return [];
            })
        );
    };

    updateComments(editedComment: Interfaces.Comments): Observable<Array<Model.Comments>> {
        return this.dataService.updateCSAComments(editedComment).pipe(
            map((comments: Array<Interfaces.Comments>) =>  {
                return comments;
            }), // Assuming comments are in a 'comments' property
            catchError(error => {
                console.error('Error loading comments:', error);
                return [];
            })
        );
    };

    getAllComments(): Observable<Array<Interfaces.Comments>> {
        return this.dataService.getAllComments(17149).pipe(
            map((comments: Array<Interfaces.Comments>) => {
                return comments
            }), // Assuming comments are in a 'comments' property
            catchError(error => {
                console.error('Error loading comments:', error);
                return [];
            })
        );
    };
}

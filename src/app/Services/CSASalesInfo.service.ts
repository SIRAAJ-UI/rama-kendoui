import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';
import * as Model from '../core/models/csasalesinfo.model';
import * as Interfaces from '../core/interfaces/csasalesinfo.interface';
import { BehaviorSubject, Observable, Subject, catchError, debounceTime, distinctUntilChanged, map, of } from 'rxjs'; 
import { QueryParamsService } from './query-params.service';
import { csaexpenses } from '@csa/@core/models/csaexpenses.model';
import { ResourceService } from '@csa/@services/resource.service';
import { environment } from '../../environments/environment'; 
 import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http"; 
import { ErrorLoggingService } from './error-logging.service';
 import { LoadingService } from './loading.service';
@Injectable({
    providedIn: 'root'
})
export class CsaSalesInfoService {

    public salesInfoForm: any; 
    public isoptionchecked:boolean=false;
    public iscontsalechecked:boolean=false;
    public commentText: string;
    public comments: Array<Model.comments> = [];
    public PropertyInfo: Subject<Interfaces.propertyinfo>;
    public disabledTabs: Subject<any>;
    public SaleInfoHasIncomesExpenses: boolean;
    public resources: any;
    private baseUrl: string = environment.ImproveBaseURL;

    constructor(private loadingService: LoadingService,
        private dataService: DataService, 
         private validatorService: ValidatorService,
         private _QueryParams: QueryParamsService,
         private resourceService: ResourceService ,
         private http: HttpClient,
         private errorService: ErrorLoggingService,
         ) { 
            this.loadingService.showLoading();
        this.PropertyInfo = new Subject();
        this.disabledTabs = new Subject();
        this.resources=[];
        this.initializeCSASalesForm();
        this.listenToChange();
       
        this.loadingService.hideLoading();
    } 

    initializeCSASalesForm() { 

        this.salesInfoForm = new FormGroup({
            anticipated_use_cd: new FormControl(null, [this.validatorService.validateAnticipatedUse()]),
            csa_prop_use_detl: new FormControl(null, [this.validatorService.validateMaxLength(30)]),
            pct_owner_occup: new FormControl('', [this.validatorService.validateMaxLength(3), this.validatorService.customNumberValidator()]),
            broker_involved_fl: new FormControl(null),
            buy_sell_rel_fl: new FormControl(null, [this.validatorService.validateMaxLength(1)]),
            buy_sell_rel_desc: new FormControl(null, []),
            isoptionchecked: new FormControl(false),
            iscontsalechecked: new FormControl(false),
            pur_predate_by_opt: new FormControl(false),
            pur_pred_cont_sale : new FormControl(false),
            predate_cont_date: new FormControl(''),
            cond_at_sale_cd: new FormControl(null, [this.validatorService.validateMaxLength(1)]),
            suprv_approved_fl: new FormControl(null),
            benchmark_rate_cd: new FormControl('a', [this.validatorService.validateMaxLength(1)]),
            doc_prefix : new FormControl(null),
            doc_series: new FormControl(null),
            entry_ts: new FormControl(null),
            entry_worker: new FormControl(null),
            property_id: new FormControl(null),
            row_change_ts: new FormControl(null),
            event_ts : new FormControl(null),
            buyer_name : new FormControl(null),
            seller_name : new FormControl(null),
            print_parcel : new FormControl(null),
            use_id: new FormControl(null),
            use_name : new FormControl(null),
            address: new FormControl(null), 
            entry_user: new FormControl(null),
            situs_city_name: new FormControl(null),
            situs_state: new FormControl(null),
            zip_cd : new FormControl(null),     
            doc_parcel_cnt: new FormControl(null),
            ind_pur_price : new FormControl(null),
            adj_sales_price: new FormControl(null),
            trans_tax_price : new FormControl(null),
            tot_building_area: new FormControl(null),
            tot_lot_size: new FormControl(null),
            tot_net_rent_area: new FormControl(null),
            csa_id: new FormControl(null),
            csa_type: new FormControl(null),
            update_ts: new FormControl(null),
            update_user: new FormControl(null),
            update_worker: new FormControl(null),
        });
    };
    getResourceData()
    {
        this.resources = this.resourceService.getResources();
    }
    

    getSalesinfo() { 
        this.dataService.GetDataByUrl("GetFullSaleInfo",this._QueryParams.csaId).subscribe(
            (data: Array<Interfaces.cisalesinfo>) => {
                try {
                   
                    this.bindedToSaleInfo(data[0]);
                } catch (e) {
                    console.error("Error getting:", e);
                    catchError(this.handleError);
                    return null;
                  }
                  this.loadingService.hideLoading();
        });  
    };  
      UpdatedSaleInfoWithCIAnalysis_Service (CISalesinfoModel: Interfaces.cisalesinfo): Observable<any> { 
        return this.http.post<any>( this.baseUrl +'/csa/UpdatedSaleInfoWithCIAnalysis',CISalesinfoModel);
    
     }
     saveCSAComments(CSAComments:Interfaces.comments):Observable<any>{ 
      return this.http.post<any>(  this.baseUrl +'/csa/SaveCsaComments',CSAComments);
     }
     updateCSAComments(CSAComments:Interfaces.comments):Observable<any>{
      return this.http.post<any>( this.baseUrl +'/csa/UpdateCsaComments',CSAComments);
     }
    getLeaseInfoService(csa_id: any): Observable<any> {      
        return this.http.get<any>(this.baseUrl + '/csa/GetLeaseInfo/' + csa_id);
     }
     getExpensesService(CSA_Id:any,expense_bool:any):Observable<any>{ 
        return this.http.get<any>(this.baseUrl + '/csa/GetExpenses/' + CSA_Id + '/' + expense_bool);
      }
    getLeaseInfo()
    {
        this.dataService.GetDataByUrl("GetLeaseInfo",this._QueryParams.csaId).subscribe( (data: Array<Interfaces.cisalesinfo>) =>{
            if(data.length>0){
                this.SaleInfoHasIncomesExpenses=true;
            } 
            else{
                this.getExpensesService(this._QueryParams.csaId,false)
                .subscribe((data: Array<csaexpenses>) =>{
                    if(data.length>0){
                        this.SaleInfoHasIncomesExpenses=false;

                        const amount_owners = data.filter(item => { return item?.amount_owners});
                        const amount_tenant = data.filter(item => { return item?.amount_tenant});
                      
                        if((amount_owners?.length === 0) || (amount_tenant?.length === 0)) {
                            this.SaleInfoHasIncomesExpenses = true;
                        }

                    }
                   
                });
            }
        });
    }
     
    private bindedToSaleInfo(record: Interfaces.cisalesinfo){
        const salesinfo = record; 
        if(salesinfo.pur_predate_by_opt== 'N')
            {
             this.isoptionchecked = false;
            }
            else  if(salesinfo.pur_predate_by_opt== 'Y')
                {
                    this.isoptionchecked = true;
                }
            if(salesinfo.pur_pred_cont_sale == 'N')
                {
                  this.iscontsalechecked=false;
                }
                else  if(salesinfo.pur_pred_cont_sale == 'Y')
                    {
                        this.iscontsalechecked=true;
                    }
        const salesInfoVariable = {
            anticipated_use_cd: salesinfo.anticipated_use_cd,
            csa_prop_use_detl: salesinfo.csa_prop_use_detl,
            pct_owner_occup: salesinfo.pct_owner_occup,
            broker_involved_fl: salesinfo.broker_involved_fl,
            buy_sell_rel_fl: salesinfo.buy_sell_rel_fl,
            buy_sell_rel_desc: String(salesinfo.buy_sell_rel_desc).trim(),            
            isoptionchecked:this.isoptionchecked,  
            iscontsalechecked:this.iscontsalechecked,
            predate_cont_date: salesinfo.predate_cont_date!=null?new Date(salesinfo.predate_cont_date):null,
            cond_at_sale_cd: salesinfo.cond_at_sale_cd,
            suprv_approved_fl: salesinfo.suprv_approved_fl,
            benchmark_rate_cd: salesinfo.benchmark_rate_cd,
            doc_prefix : salesinfo.doc_prefix, 
            doc_series: salesinfo.doc_series,
            entry_ts:salesinfo.entry_ts,
            entry_worker:salesinfo.entry_worker,
            property_id:salesinfo.property_id,
            row_change_ts:salesinfo.row_change_ts,
            event_ts : new Date(salesinfo.event_ts),
            buyer_name : salesinfo.buyer_name,
            seller_name : salesinfo.seller_name,
            print_parcel : salesinfo.print_parcel,
            use_id : salesinfo.use_id,
            use_name : salesinfo.use_name,
            address : salesinfo.situs_address, 
            entry_user:salesinfo.entry_user,
            situs_city_name :  salesinfo.situs_city_name,
            situs_state : salesinfo.situs_state,
            zip_cd :  salesinfo.zip_cd,
            doc_parcel_cnt : salesinfo.doc_parcel_cnt,
            ind_pur_price : salesinfo.ind_pur_price,
            adj_sales_price : salesinfo.adj_sales_price,
            trans_tax_price : salesinfo.trans_tax_price,
            tot_building_area: (salesinfo.tot_building_area),
            tot_lot_size: (salesinfo.tot_lot_size),
            tot_net_rent_area: (salesinfo.tot_net_rent_area),
            csa_id:this._QueryParams.csaId,
            csa_type:this._QueryParams.csaType,
            update_ts : new Date(),
            update_user : '',
            update_worker : 'CSM     ',
          }; 
        this.salesInfoForm.patchValue(salesInfoVariable);

       

    };
    private listenToChange() {
        const controls = this.salesInfoForm.controls;
        controls.buy_sell_rel_desc.valueChanges
            .pipe(debounceTime(400), distinctUntilChanged())
            .subscribe((_buy_sell_rel_desc: string) => {
                const buy_sell_rel_desc = String(_buy_sell_rel_desc).trim();
                const controlValue = this.salesInfoForm.controls.buy_sell_rel_fl.value;
                if (!controlValue) {
                    if (buy_sell_rel_desc === "") {
                        controls.buy_sell_rel_desc.setErrors(null)
                    } else {

                        controls.buy_sell_rel_desc.setErrors({ required: { message: this.resources?.Buy_Sell_Relationship_Description_Indication   } })
                    }
                } else {
                    if (String(controlValue) === 'Y') {
                        if ((!buy_sell_rel_desc) || (buy_sell_rel_desc === "")) {
                            controls.buy_sell_rel_desc.setErrors({ required: { message: this.resources?.Buy_Sell_Relationship_Description_Required  } })
                        } else {
                            controls.buy_sell_rel_desc.setErrors(null);
                        }
                    }
                    if (String(controlValue) === 'N') {
                        if (buy_sell_rel_desc !== "") {
                           controls.buy_sell_rel_desc.setErrors({ required: { message: this.resources?.Buy_Sell_Relationship_Description_Indication  } })
                        } else {
                            controls.buy_sell_rel_desc.setErrors(null);
                        }
                    }
                }
            });

        controls.buy_sell_rel_fl.valueChanges
            .subscribe((buy_sell_rel_fl: number) => {
                const controlValue = String(this.salesInfoForm.controls.buy_sell_rel_desc.value).trim();
                if (String(buy_sell_rel_fl) === 'Y') {
                    if ((!controlValue) || (controlValue == "")) {
                        controls.buy_sell_rel_desc.setValue("");
                        controls.buy_sell_rel_desc.setErrors({ required: { message: this.resources?.Buy_Sell_Relationship_Description_Required  } })
                    } else {
                        controls.buy_sell_rel_desc.setErrors(null);
                    }
                }
                if (String(buy_sell_rel_fl) === 'N') {
                    controls.buy_sell_rel_desc.setValue("");
                    if (controlValue) {
                        controls.buy_sell_rel_desc.setErrors({ required: { message: this.resources?.Buy_Sell_Relationship_Description_Indication  } })
                    } else {
                        controls.buy_sell_rel_desc.setErrors(null)
                    }
                }
            });

        controls.cond_at_sale_cd.valueChanges
            .subscribe((isChecked: boolean) => {
                const controlValue = this.salesInfoForm.controls.cond_at_sale_cd.value;
                if (isChecked) {
                    if (!controlValue) {
                        controls.cond_at_sale_cd.setErrors({ required: { message: this.resources?.Contract_Date_Required  } })
                    }
                }
            });

        controls.pct_owner_occup.valueChanges
            .subscribe((value: number) => {                
               if(value == 100){
                    this.disabledTabs.next(true); 
               }               
               else if(value<0 || value>100) {                   
                    controls.pct_owner_occup.setErrors({ required: { message: this.resources?.Owner_Occupied_Range } });
               }
               else if(value == 100 && this.SaleInfoHasIncomesExpenses==true)
               {
                controls.pct_owner_occup.setErrors({ required: { message: this.resources?.Owner_Occupied_Indication_deleteIncomeExpenses } });
                
               }
               else
               {
                controls.pct_owner_occup.setErrors(null);
                this.disabledTabs.next(false); 
               }
            });
    };

    GetPageTitleByCSAType(csaType: number): Observable<any> {
        return this.dataService.GetPageTitleByCSAType(csaType)
    };

    UpdatedSaleInfoWithCIAnalysis () {   
        let CISalesinfo: any = new Model.cisalesinfo();
         for (let [key, control] of Object.entries(this.salesInfoForm.controls)) {
             if(this.salesInfoForm.get('isoptionchecked').value==false)
             {
                this.salesInfoForm.get('pur_predate_by_opt').value = 'N';
             }
             else if(this.salesInfoForm.get('isoptionchecked').value==true)
             {
                this.salesInfoForm.get('pur_predate_by_opt').value = 'Y';
             }
             if(this.salesInfoForm.get('iscontsalechecked').value==false)
             {
                this.salesInfoForm.get('pur_pred_cont_sale').value = 'N';
             }
             else if(this.salesInfoForm.get('iscontsalechecked').value==true)
             {
                this.salesInfoForm.get('pur_pred_cont_sale').value = 'Y';
             }
           
             CISalesinfo[key] = this.salesInfoForm.get(key).value; 
           
        }  
  
         this.UpdatedSaleInfoWithCIAnalysis_Service(CISalesinfo).subscribe(result =>{
            try {
                this.loadingService.showLoading();
                this.getSalesinfo(); 
              } catch (e) {
                console.error("Error getting:", e);
                catchError(this.handleError);
                return null;
              } 
              this.loadingService.hideLoading();

            });
    };
    private handleError(err: HttpErrorResponse) {
        return this.errorService.logError(
          2,
          "Error getting property characteristics. " + err.error
        );
      }

    salesInfoFormValidation(): Array<string> {
        return this.validatorService.validateForm(this.salesInfoForm.controls);
    };
    addComments(addComment: Interfaces.comments): Observable<Array<Model.comments>> {
        
        return this.saveCSAComments(addComment).pipe(
            map((comments: Array<Interfaces.comments>) =>  comments  ), // Assuming comments are in a 'comments' property
            catchError(error => {
                console.error('Error loading comments:', error);
                return [];
            })
        ); 
    };

    updateComments(editedComment: Interfaces.comments): Observable<Array<Model.comments>> {  
        

        return this.updateCSAComments(editedComment).pipe(
            map((comments: Array<Interfaces.comments>) =>  comments  ), // Assuming comments are in a 'comments' property
            catchError(error => {
                console.error('Error loading comments:', error);
                return [];
            })
        ); 
    };

    getAllComments(): Observable<Array<Interfaces.comments>> {
      
        return this.dataService.GetDataByUrl("GetCSAComments",this._QueryParams.csaId).pipe(
            map((comments: Array<Interfaces.comments>) =>  comments  ), // Assuming comments are in a 'comments' property
            catchError(error => {
                console.error('Error loading comments:', error);
                return [];
            })
        );
    };
}

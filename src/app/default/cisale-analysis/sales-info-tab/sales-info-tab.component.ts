import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { CommentsBlockComponent } from '@csa/@shared/comments-block/comments-block.component';
import {
  anticipatedusecodes,
  conditionatsales,
} from '@csa/@core/interfaces/csasalesinfo.interface';
import * as Model from '@csa/@core/models/csasalesinfo.model';
import * as Interfaces from '@csa/@core/interfaces/csasalesinfo.interface';

import { ApiService } from '@csa/@services/api.service';
import { DataService } from '@csa/@services/data.service';
import { CsaSalesInfoService } from '@csa/@services/CSASalesinfo.service';
import { LoadingService } from '@csa/@services/loading.service';
import { QueryParamsService } from '@csa/@services/query-params.service';
import { ConstantValueService } from '@csa/@services/constant-values.service';
import { LoadingOverlayComponent } from '@csa/@shared/loading-overlay/loading-overlay.component';
import { csaexpenses } from '@csa/@core/models/csaexpenses.model'; 
import {  DialogCloseResult, DialogRef, DialogService, DialogTitleBarComponent, DialogsModule } from '@progress/kendo-angular-dialog';
import { DynamicDialogContentComponent } from '@csa/@shared/dynamic-dialog-content/dynamic-dialog-content.component';

@Component({
  selector: 'app-sales-info-tab',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropDownsModule,
    CommonModule,
    InputsModule,
    DateInputsModule,
    LabelModule,
    CommentsBlockComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './sales-info-tab.component.html',
  styleUrl: './sales-info-tab.component.css',
})
export class SalesInfoTabComponent {
  public salesInfoForm!: FormGroup;
  public submitted = false;
  public events: string[] = [];
  public numerictextbox: number;
  public brokerInvolved: Array<Interfaces.brokerinvolved> = [
    { broker_involved_fl: ' ', broker_involved_fl_text: ' ' },
    { broker_involved_fl: 'Y', broker_involved_fl_text: 'Yes' },
    { broker_involved_fl: 'N', broker_involved_fl_text: 'No' },
  ];
  public buyerSellerRelationship: Array<Interfaces.BuyerSellerRelationship> = [
    { buy_sell_rel_fl: ' ', buy_sell_rel_fl_text: ' ' },
    { buy_sell_rel_fl: 'Y', buy_sell_rel_fl_text: 'Yes' },
    { buy_sell_rel_fl: 'N', buy_sell_rel_fl_text: 'No' },
  ];

  public benchMarkRating: any;
  public SelectedanticipatedUse: any;
  public SelectedbenchmarkRating: any;
  public conditionAtSales: conditionatsales[] = [];
  public anticipatedUse: anticipatedusecodes[] = []; 
  public csa_Id: number = 0;
  SaleInfoHasIncomesExpenses: boolean;
  constructor(
    private loadingService: LoadingService,
    private dataService: DataService,
    private csaSalesInfoService: CsaSalesInfoService,
    private apiService: ApiService,
    private _QueryParams: QueryParamsService,
    private fb: FormBuilder,
    private _constantValueService: ConstantValueService, 
    private dialogService: DialogService
  ) {}

  ngOnInit(){
    this.loadingService.showLoading(); 
    this.salesInfoForm = this.csaSalesInfoService.salesInfoForm;
    this.csa_Id = this._QueryParams.csaId; 
     this.fetchAllData();
    
  }

   fetchAllData() {
    this.getAnticipatedDropdownInfo();
    this.getConditionAtSaleDropdownInfo(); 
    this.getLeaseInfo();
    this.csaSalesInfoService.getResourceData();
    this.csaSalesInfoService.getSalesinfo();
    this.loadingService.hideLoading();
  }

// TODO (RAMADEVI): If this is just for your tab validation, put it in your tab
validationCheck(): boolean {
  const validationErrors:Array<string> = this.csaSalesInfoService.salesInfoFormValidation();
  if(validationErrors?.length === 0){
    
    this.csaSalesInfoService.UpdatedSaleInfoWithCIAnalysis();
    return true;
  } else {
    this.showConfirmation(validationErrors);
    return false;
  }
};

public showConfirmation(validationErrors: Array<string>): void {
  const dialog: DialogRef = this.dialogService.open({
    title: "IMPROVE", 
    content: DynamicDialogContentComponent, 
    width: 530,
    height: 200,
    minWidth: 450
  });
  const userInfo = dialog.content.instance as DynamicDialogContentComponent;
  validationErrors = validationErrors.filter( element => {
    return element !== undefined
  })
  userInfo.ErrorMessages = validationErrors;
  dialog.result.subscribe((result) => {
    if (result instanceof DialogCloseResult) { 
    } else { 
    }

  });
}
  getAnticipatedDropdownInfo() {
    this.dataService
      .GetDataByUrl('GetAnticipatedUseCodes')
      .subscribe((anticipdateUse: Array<Model.anticipatedusecodes>) => {
        this.anticipatedUse = anticipdateUse; 
        this.anticipatedUse.unshift({ anticipated_use_cd:-1 ,use_name: '' });
        this.anticipatedUse.map((control) => control.use_name.trim());
      });
  }

  roundValue() {
    this.numerictextbox = Math.round(this.numerictextbox); // Round the value to the nearest integer
  }

  getConditionAtSaleDropdownInfo() {
    this.dataService
      .GetDataByImproveUrl(
        'common/GetFieldCode',
        this._constantValueService.fieldId
      )
      .subscribe((response: conditionatsales[]) => {       
        this.conditionAtSales =response.map((e: any) => {   
          return { cd_id: e.CD_ID, cd_long_name: e.CD_LONG_NAME };
        }); 
        this.conditionAtSales.unshift({ cd_id:'' ,cd_long_name: '' });       

      });
  }
  
  getLeaseInfo()
  {
      this.dataService.GetDataByUrl("GetLeaseInfo",this._QueryParams.csaId).subscribe( (data: Array<Interfaces.cisalesinfo>) =>{
          if(data.length>0){
              this.SaleInfoHasIncomesExpenses=true;
          } 
          else{
              this.csaSalesInfoService.getExpensesService(this._QueryParams.csaId,false)
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
}

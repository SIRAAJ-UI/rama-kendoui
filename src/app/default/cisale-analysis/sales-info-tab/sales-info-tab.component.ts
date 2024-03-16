import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, AfterViewInit,ViewChild } from '@angular/core';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { CommentsBlockComponent } from '../../../Shared/comments-block/comments-block.component';
import { DataService } from '../../../Services/data.service';
import { ApiService } from '../../../Services/api.service'
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

export class AnticipatedUseCodes{
  anticipateD_USE_CD: any;
  usE_NAME:any;
}
export class ConditionAtsales{
  cD_ID:any;
  cD_LONG_NAME:any;
}
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
    CommentsBlockComponent
  ],
  templateUrl: './sales-info-tab.component.html',
  styleUrl: './sales-info-tab.component.css',
})
export class SalesInfoTabComponent  {
  @Input() salesInfoForm!: FormGroup; 
  submitted = false;
  
 // public form: FormGroup = new FormGroup({});
  public events: string[] = [];
  public brokerInvolved: Array<{ text: string, id: number }> = [ { text: 'Yes', id: 1 },
  { text: 'No', id: 2 }];
  public buyerSellerRelationship:Array<{ text: string, id: number }> = [ { text: 'Yes', id: 1 },
  { text: 'No', id: 2 }];
  benchMarkRating :any;

  public conditionAtSales: ConditionAtsales[] = [ ];
  public data: AnticipatedUseCodes[]=[]; 
   
  constructor(private dataService: DataService,private apiService: ApiService,private fb: FormBuilder) {

   
  } 
  get f() { return this.salesInfoForm.controls; }
ngOnInit():void{

   this.salesInfoForm =new FormGroup({
    anticipatedUse: new FormControl('', Validators.required),
    details: new FormControl(null ),
     supervisorApproved: new FormControl(null ),
     ownerOccupied: new FormControl(null ),
     brokerInvolved: new FormControl(null ),
     buyerSellerRelationship: new FormControl(null ),
     ifBuyerSellerRelationship: new FormControl(null ),
     purchasePredatedBy: new FormControl(null),
     contractDate: new FormControl(null),
     conditionAtSales: new FormControl(null),
  });

  this.getAnticipatedDropdownInfo();
    this.getConditionAtSaleDropdownInfo();


}
  
 


getAnticipatedDropdownInfo() {
  this.dataService.getAnticipatedCodes().subscribe((response) => {
    this.data=response;   
    });
}

getConditionAtSaleDropdownInfo() {
  this.dataService.getConditionAtSale(120).subscribe((response) => { 
    this.conditionAtSales=response;     
    });
  
}


  public valueChange(value: any): void {
    this.log('valueChange', value);
  }

  public selectionChange(value: any): void {
    this.log('selectionChange', value);
  }

  public filterChange(filter: any): void {
    this.log('filterChange', filter);
    // this.data = this.source.filter(
    //   (s) => s.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    // );
  }

  public open(): void {
    this.log('open');
  }

  public close(): void {
    this.log('close');
  }

  public opened(): void {
    this.log('opened', 'after the popup has been opened');
  }

  public closed(): void {
    this.log('closed', 'after the popup has been closed');
  }

  public focus(): void {
    this.log('focus');
  }

  public blur(): void {
    this.log('blur');
  }

  private log(event: string, arg?: any): void {
    this.events.unshift(`${event} ${arg || ''}`);
  }
  public btnComment_Click(): void {}
}

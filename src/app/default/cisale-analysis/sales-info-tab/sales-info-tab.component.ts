import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { CommentsBlockComponent } from '../../../Shared/comments-block/comments-block.component';
import { DataService } from '../../../Services/data.service';
import { ApiService } from '../../../Services/api.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
export class SalesInfoTabComponent implements AfterViewInit {
  @Input() salesInfoForm!: FormGroup;
  @Output() tabChange = new EventEmitter<any>();

  validateAllFormFields() {
    Object.keys(this.salesInfoForm.controls).forEach(field => {
      const control = this.salesInfoForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
      if (control instanceof FormGroup) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields();
      }
    });
  }


 // public form: FormGroup = new FormGroup({});
  public events: string[] = [];
  public brokerInvolved: Array<string> = ['Yes', 'No'];
  public buyerSellerRelationship:Array<string> = ['Yes', 'No'];
  benchMarkRating :any;

  public conditionAtSales: ConditionAtsales[] = [ ];
  public data: AnticipatedUseCodes[]=[];

  constructor(private dataService: DataService,private apiService: ApiService) {

    //this.data = new Array<AnticipatedUseCodes>();
  }
  ngAfterViewInit() {
    
  }

ngOnInit():void{
  if (!this.salesInfoForm) {
    this.salesInfoForm = new FormGroup({
      'anticipatedUse': new FormControl('', Validators.required),
      'details': new FormControl(null, Validators.required),
      'supervisorApproved': new FormControl(null, Validators.required),
      'ownerOccupied': new FormControl(null, Validators.required),
      'brokerInvolved': new FormControl(null, Validators.required),
      'buyerSellerRelationship': new FormControl(null, Validators.required),
      'ifBuyerSellerRelationship': new FormControl(null, Validators.required),
      'purchasePredatedBy': new FormControl(null, Validators.required),
      'contractDate': new FormControl(null, Validators.required),
      'conditionAtSales': new FormControl(null, Validators.required),
    });
  }

 

  this.getAnticipatedDropdownInfo();
this.getConditionAtSaleDropdownInfo();

}

// onTabChange(event:any) {
//   this.tabChange.emit(event.index);

//   this.tabChange.emit();
//   console.log('hit onSubmit');
//   if (this.form.valid) {
//     // Perform some action if the form is valid
//     console.log(this.form.value);
//   } else {
//     // Display an error message if the form is invalid
//     alert('Please fill in all required fields.');
//   }
// }



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

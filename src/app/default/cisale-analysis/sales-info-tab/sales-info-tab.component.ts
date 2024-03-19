import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { CommentsBlockComponent } from '@csa/@shared/comments-block/comments-block.component';
import { AnticipatedUseCodes, ConditionAtsales } from '@csa/@core/interfaces/csasalesinfo.interface';
import * as Model from '@csa/@core/models/csasalesinfo.model';
import * as Interfaces from '@csa/@core/interfaces/csasalesinfo.interface';

import { ApiService } from '@csa/@services/api.service';
import { DataService } from '@csa/@services/data.service';
import { CsaSalesInfoService } from '@csa/@services/CSASalesInfo.service';

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
export class SalesInfoTabComponent {
  public salesInfoForm!: FormGroup;
  public submitted = false;
  public events: string[] = [];
  public numerictextbox: number;
  public brokerInvolved: Array<Interfaces.BrokerInvolved> = [
    { id: "Y", text: 'Yes' },
    { id: "N", text: 'No' }]
  public buyerSellerRelationship: Array<Interfaces.BuyerSellerRelationship> = [
    { id: "Y", text: 'Yes' },
    { id: "N", text: 'No' }];

  public benchMarkData: Array<Interfaces.BenchMarkData> = [
    { id: 1, text: "Income and Analaysis" },
    { id: 2, text: "Value Ind tab" }
  ]
  public benchMarkRating: any;

  public conditionAtSales: ConditionAtsales[] = [];
  public anticipatedUse: AnticipatedUseCodes[] = [];

  constructor(private dataService: DataService, private csaSalesInfoService: CsaSalesInfoService, private apiService: ApiService, private fb: FormBuilder) {
    this.salesInfoForm = this.csaSalesInfoService.salesInfoForm;
  }

  ngOnInit(): void {
    this.getAnticipatedDropdownInfo();
    this.getConditionAtSaleDropdownInfo();
  }

  getAnticipatedDropdownInfo() {
    this.dataService.getAnticipatedCodes().subscribe((anticipdateUse: Array<Model.AnticipatedUseCodes>) => {
      this.anticipatedUse = anticipdateUse;
    });
  };

  roundValue() {
    this.numerictextbox = Math.round(this.numerictextbox); // Round the value to the nearest integer
  };
  
  getConditionAtSaleDropdownInfo() {
    this.dataService.getConditionAtSale(120).subscribe((response) => {
      this.conditionAtSales = response;
    });
  }

  ngOnDestroy() {
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
  public btnComment_Click(): void { }
}

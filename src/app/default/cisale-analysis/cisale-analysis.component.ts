import { Component, AfterViewInit, ViewChild, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { LogoBarComponent } from '../../Shared/logo-bar/logo-bar.component';
import { ControlBarComponent } from '../../Shared/control-bar/control-bar.component';
import { PropCharBarComponent } from '../../Shared/prop-char-bar/prop-char-bar.component';
import { LayoutModule, SelectEvent } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesInfoTabComponent } from './sales-info-tab/sales-info-tab.component';
import { TabAlignment } from "@progress/kendo-angular-layout";

import { MENU_NAMES } from '../../core/constants/constants';
import { CSASalesInfoService } from '../../Services/CSASalesInfo.service';
import { DialogCloseResult,DialogRef, DialogService } from '@progress/kendo-angular-dialog';


@Component({
  selector: 'app-cisale-analysis',
  standalone: true,
  imports: [
    LogoBarComponent,
    ControlBarComponent,
    PropCharBarComponent,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SalesInfoTabComponent,
  ],
  templateUrl: './cisale-analysis.component.html',
  styleUrl: './cisale-analysis.component.css',
})


export class CISaleAnalysisComponent  {

  @Output() activeTabChange = new EventEmitter<string>();
  @ViewChild("tabStrip") tabStrip:any;
  public activeTab: string = MENU_NAMES.SALES_INFO;
  public tabs:Array<any> = [];
  public alignment: TabAlignment = 'start';

  constructor(private csaSalesInfoService: CSASalesInfoService, private dialogService: DialogService ) {

  }
  ngOnInit() {
    this.tabs = [
      { index: 0, name: MENU_NAMES.SALES_INFO},
      { index: 1, name: MENU_NAMES.PROP_CHAR},
      { index: 2, name: MENU_NAMES.INCOME},
      { index: 3, name: MENU_NAMES.EXPENSES},
      { index: 4, name: MENU_NAMES.ADJUSTMENTS},
      { index: 5, name: MENU_NAMES.INCOME_ANALYSIS},
      { index: 6, name: MENU_NAMES.SOURCES},
    ]
  }
  
  onTabSelect(event: SelectEvent) {
    console.log('activeTab: ' + this.activeTab);
    const tabFilters:{index: number, name: string} = this.tabs.find( tab => { return (tab.name === this.activeTab)});
    setTimeout(() => {
      this.tabStrip.selectTab(tabFilters.index);
    },1);
    const validationErrors = this.csaSalesInfoService.salesInfoFormValidation();
    console.log(validationErrors);
    // console.log(validationErrors);
    // const dialog:DialogRef  = this.dialogService.open({
    //   title: "Please confirm",
    //   content: "Are you sure?",
    //   actions: [
    //     { text: "No" },
    //     { text: "Yes", themeColor: 'primary' }
    //   ]
    // });
    // dialog.result.subscribe((result) => {
    //   if (result instanceof DialogCloseResult) {
    //     console.log("close");
    //   } else {
    //     console.log("action", result);
    //   }
    // });
    
    // console.log(event.index);
    // this.activeTab = event.title;
    // this.tabStrip.selectTab(0)
    //
    // if(this.csaSalesInfoService.CSASalesForm.valid){
    //     this.onSave();
    // }
  };

  onTabClose(event: any){
    console.log(event)
  };

  onSave(event: any = null) {
    switch (this.activeTab) {
      case MENU_NAMES.SALES_INFO:
        console.log("Sales Info:")
        break;
      case MENU_NAMES.PROP_CHAR:
        console.log("Prop Characteristics:")
        break;
      case MENU_NAMES.INCOME:
        console.log("Income:")
        break;
      case MENU_NAMES.EXPENSES:
        console.log("Expenses:")
        break;
      case MENU_NAMES.ADJUSTMENTS:
        console.log("Adjustments:")
        break;
      case MENU_NAMES.INCOME_ANALYSIS:
        console.log("Adjustments:")
        break;
      case MENU_NAMES.SOURCES:
        console.log("Sources:")
        break;
      default:
        break;
    }
  }
}

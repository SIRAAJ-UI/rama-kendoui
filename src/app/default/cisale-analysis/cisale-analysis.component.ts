import { Component, AfterViewInit, ViewChild, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule, SelectEvent } from '@progress/kendo-angular-layout';
import { TabAlignment } from "@progress/kendo-angular-layout";
import {  DialogCloseResult, DialogRef, DialogService, DialogsModule } from '@progress/kendo-angular-dialog';

import { SalesInfoTabComponent } from '@csa/@components/cisale-analysis/sales-info-tab/sales-info-tab.component'
import { LogoBarComponent } from '@csa/@shared/logo-bar/logo-bar.component';
import { ControlBarComponent } from '@csa/@shared/control-bar/control-bar.component';
import { PropCharBarComponent } from '@csa/@shared/prop-char-bar/prop-char-bar.component';
import { MENU_NAMES } from '@csa/@core/constants/constants';
import { CsaSalesInfoService } from '@csa/@services/CSASalesInfo.service'
import { DynamicDialogContentComponent } from '@csa/@shared/dynamic-dialog-content/dynamic-dialog-content.component';

@Component({
  selector: 'app-cisale-analysis',
  standalone: true,
  imports: [
    LogoBarComponent,
    ControlBarComponent,
    PropCharBarComponent,
    LayoutModule,
    ReactiveFormsModule,
    DialogsModule,
    FormsModule,
    DynamicDialogContentComponent,
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
  public isDisableTabs: boolean = false;

  constructor(private csaSalesInfoService: CsaSalesInfoService, private dialogService: DialogService ) {

  }
  ngOnInit() {
    this.csaSalesInfoService.disabledTabs.subscribe((isTabDisable: boolean) => {
      this.isDisableTabs = isTabDisable;
    });
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
    this.validationCheck();
  };

  private validationCheck(){
    const validationErrors:Array<string> = this.csaSalesInfoService.salesInfoFormValidation();
    if(validationErrors?.length === 0){
      this.csaSalesInfoService.saveCSASalesForm();
    } else {
      this.showConfirmation(validationErrors);
    }
  };

  public showConfirmation(validationErrors: Array<string>): void {
    const dialog: DialogRef = this.dialogService.open({
      title: "Error Message",
      content: DynamicDialogContentComponent,
      actions: [{ text: "Ok",themeColor: "primary" }],
      width: 450,
      height: 300,
      minWidth: 350,
    });
    const userInfo = dialog.content.instance as DynamicDialogContentComponent;
    userInfo.ErrorMessages = validationErrors;
    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log("close");
      } else {
        console.log("action", result);
      }

    });
  }

  onDisableTabs(event: any) {
    console.log("******************");
    console.log(event);
    console.log("******************");
  }
  onTabClose(event: any){
    console.log(event)
  };

  onSave(event: any = null) {
    switch (this.activeTab) {
      case MENU_NAMES.SALES_INFO:
        console.log("Sales Info:")
        this.validationCheck();
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

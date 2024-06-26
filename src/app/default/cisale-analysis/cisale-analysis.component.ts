import { LogoBarComponent } from "../../Shared/logo-bar/logo-bar.component";
import { NavigationBarComponent } from "@csa/@shared/navigation-bar/navigation-bar.component";
import { ControlBarComponent } from "../../Shared/control-bar/control-bar.component";
import { PropCharBarComponent } from "../../Shared/prop-char-bar/prop-char-bar.component";
import { SalesInfoTabComponent } from "./sales-info-tab/sales-info-tab.component";
import { PropCharsTabComponent } from "./prop-chars-tab/prop-chars-tab.component";
import { Component, AfterViewInit, ViewChild, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule, SelectEvent } from '@progress/kendo-angular-layout';
import { TabAlignment } from "@progress/kendo-angular-layout";
 
import { MENU_NAMES } from '@csa/@core/constants/constants';
import { CsaSalesInfoService } from '@csa/@services/CSASalesinfo.service'
import { AuthService } from "@csa/@services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cisale-analysis",
  standalone: true,
  imports: [
    LogoBarComponent,
    NavigationBarComponent,
    ControlBarComponent,
    PropCharBarComponent,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SalesInfoTabComponent,
    PropCharsTabComponent,
  ],
  templateUrl: "./cisale-analysis.component.html",
  styleUrl: "./cisale-analysis.component.css",
})


export class CISaleAnalysisComponent  {

  @Output() activeTabChange = new EventEmitter<string>();
  @ViewChild("tabStrip") tabStrip:any;
  @ViewChild("salesInfoTabComponent") salesinfotabcomponent: SalesInfoTabComponent;

  public activeTab: string = MENU_NAMES.SALES_INFO;
  public tabs:Array<any> = [];
  public alignment: TabAlignment = 'start';
  public isDisableTabs: boolean = false;

  constructor(private csaSalesInfoService: CsaSalesInfoService, private authService: AuthService,
    private router: Router ) {

  }
  ngOnInit() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/error']);
    }

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
    event.preventDefault();
    const tabFilters:{index: number, name: string} = this.tabs.find( tab => { return (tab.name === this.activeTab)}); 
    if(this.salesinfotabcomponent && this.salesinfotabcomponent.validationCheck()){
      this.tabStrip.selectTab(event.index);
    }
  };



  onDisableTabs(event: any) {
  }
  onTabClose(event: any){
  };

  onSave(event: any = null) {
    switch (this.activeTab) {
      case MENU_NAMES.SALES_INFO:
        this.salesinfotabcomponent.validationCheck();
        break;
      case MENU_NAMES.PROP_CHAR:
        break;
      case MENU_NAMES.INCOME:
        break;
      case MENU_NAMES.EXPENSES:
        break;
      case MENU_NAMES.ADJUSTMENTS:
        break;
      case MENU_NAMES.INCOME_ANALYSIS:
        break;
      case MENU_NAMES.SOURCES:
        break;
      default:
        break;
    }
  }
}

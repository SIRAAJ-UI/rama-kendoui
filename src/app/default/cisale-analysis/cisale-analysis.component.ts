import { Component,AfterViewInit,ViewChild,QueryList,Input,Output, EventEmitter } from '@angular/core';
import { LogoBarComponent } from '../../Shared/logo-bar/logo-bar.component';
import { ControlBarComponent } from '../../Shared/control-bar/control-bar.component';
import { PropCharBarComponent } from '../../Shared/prop-char-bar/prop-char-bar.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesInfoTabComponent } from './sales-info-tab/sales-info-tab.component';
import { TabAlignment } from "@progress/kendo-angular-layout"; 

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
export class CISaleAnalysisComponent implements AfterViewInit {
  @ViewChild(SalesInfoTabComponent) salesInfoTabComponent!: SalesInfoTabComponent; 
  @Output()  activeTabChange = new EventEmitter<string>();
  constructor() {
    
  } 
  public alignment: TabAlignment = 'start';
  ngAfterViewInit() {
   
  }
  checkValidations() {
    
  }
  onTabChange(event: any) {
    console.log('hit ci sale tab');
    const tabTitle = event.title;
    console.log('tab title: '+tabTitle);
    this.activeTabChange.emit(event.tab.text);
    console.log(this.salesInfoTabComponent.salesInfoForm.valid);
     if(!this.salesInfoTabComponent.salesInfoForm.valid)
    {
      event.preventDefault();
    }
     
    if (tabTitle === 'Sales Info') {
      // Handle Sales Info tab change
    } else if (tabTitle === 'Prop Characteristics') {
      // Handle Prop Characteristics tab change
      // You can call a method in the child component like this:
      //this.propCharacteristicsComponent.onTabChange();
    }
    

}


}

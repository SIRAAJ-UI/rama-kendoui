import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";

import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";

@Component({
  selector: 'app-sales-info-tab',
  standalone: true,
  imports: [DropDownsModule,CommonModule,
    InputsModule,DateInputsModule,
    LabelModule,
 ],
  templateUrl: './sales-info-tab.component.html',
  styleUrl: './sales-info-tab.component.scss'
})
export class SalesInfoTabComponent {
  public events: string[] = [];
  public brokerInvolved: Array<string> = [
    "Yes", "No"
  ]
  public source: Array<string> = [
    "Albania",
    "Andorra",
    "Armenia",
    "Austria",
    "Azerbaijan",
  ];

  public conditionAtSales:Array<string> = [
    "Albania",
    "Andorra",
  ]
  public data: Array<string>;

  constructor() {
    this.data = this.source.slice();
  }

  public valueChange(value: any): void {
    this.log("valueChange", value);
  }

  public selectionChange(value: any): void {
    this.log("selectionChange", value);
  }

  public filterChange(filter: any): void {
    this.log("filterChange", filter);
    this.data = this.source.filter(
      (s) => s.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  }

  public open(): void {
    this.log("open");
  }

  public close(): void {
    this.log("close");
  }

  public opened(): void {
    this.log("opened", "after the popup has been opened");
  }

  public closed(): void {
    this.log("closed", "after the popup has been closed");
  }

  public focus(): void {
    this.log("focus");
  }

  public blur(): void {
    this.log("blur");
  }

  private log(event: string, arg?: any): void {
    this.events.unshift(`${event} ${arg || ""}`);
  }

}

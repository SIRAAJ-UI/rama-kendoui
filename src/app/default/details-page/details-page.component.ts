import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  TabAlignment, TabComponent } from "@progress/kendo-angular-layout";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { SalesInfoTabComponent } from './sales-info-tab/sales-info-tab.component';
import { AddRemarksComponent } from './add-remarks/add-remarks.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [LayoutModule, ReactiveFormsModule, SalesInfoTabComponent, AddRemarksComponent,  FormsModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent {
  public alignment: TabAlignment = "start";

}

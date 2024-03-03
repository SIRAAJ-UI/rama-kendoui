import { Component,OnInit, ViewChild  } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DialogRef
} from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogThemeColor } from "@progress/kendo-angular-dialog";
import { GridModule } from "@progress/kendo-angular-grid";
import { LabelModule } from "@progress/kendo-angular-label";


@Component({
  selector: 'app-add-remarks',
  standalone: true,
  imports: [DialogModule,NgIf,InputsModule,ButtonsModule, LabelModule, GridModule],
  templateUrl: './add-remarks.component.html',
  styleUrl: './add-remarks.component.scss'
})
export class AddRemarksComponent  {
  
  @ViewChild("commentsArea") commentsArea: any;
  public dialogThemeColor: DialogThemeColor = "primary";
  public gridData: any[] = [
    {
      ProductID: 1,
      ProductName: "Chai",
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: "Beverages",
      },
    },
    {
      ProductID: 2,
      ProductName: "Chang",
      UnitPrice: 19,
      Category: {
        CategoryID: 1,
        CategoryName: "Beverages",
      },
    },
    {
      ProductID: 3,
      ProductName: "Aniseed Syrup",
      UnitPrice: 10,
      Category: {
        CategoryID: 2,
        CategoryName: "Condiments",
      },
    },
  ];

  public opened = false;
  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  // ngOnInit() {
  //   this.commentsArea.nativeElement.trim()
  // }
}

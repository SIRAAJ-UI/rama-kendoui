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
      commentsID: 1,
      comments: "Chai"
    },
    {
      commentsID: 2,
      comments: "Chang"
    },
    {
      commentsID: 3,
      comments: "Aniseed Syrup"
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

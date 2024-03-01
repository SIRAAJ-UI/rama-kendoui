import { Component,OnInit  } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DialogRef
} from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-add-remarks',
  standalone: true,
  imports: [DialogModule,NgIf,InputsModule],
  templateUrl: './add-remarks.component.html',
  styleUrl: './add-remarks.component.scss'
})
export class AddRemarksComponent  {
    
 
  // public formGroup: FormGroup= this.fb.group({
  //   age:  0,
  //   name: 'Rama',
  // });;
  // public ngOnInit(): void {
    // this.formGroup = this.fb.group({
    //   age: 0,
    //   name: 'Rama',
    // });
  //}
  public opened = false;

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }
}

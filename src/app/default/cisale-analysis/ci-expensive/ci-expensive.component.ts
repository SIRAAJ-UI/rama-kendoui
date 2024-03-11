import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';

@Component({
  selector: 'app-ci-expensive',
  standalone: true,
  imports: [
    DropDownsModule,
    CommonModule,
    InputsModule,
    DateInputsModule,
    LabelModule,
  ],
  
  templateUrl: './ci-expensive.component.html',
  styleUrl: './ci-expensive.component.css'
})
export class CiExpensiveComponent {

}

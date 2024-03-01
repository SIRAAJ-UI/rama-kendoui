import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { CommonModule } from '@angular/common';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { PBPageComponent } from './pbpage/pbpage.component';
import { IconThemeColor, IconsModule } from '@progress/kendo-angular-icons';
import { FieldSetGroupComponent } from './default/field-set-group/field-set-group.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            DateInputsModule,
            CommonModule,
        TextBoxModule,
        DropDownsModule,
        LayoutModule,
        FieldSetGroupComponent,
        FormsModule,
        IconsModule,
        ButtonsModule,
        InputsModule,
        LabelModule,
        PBPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'assr_csa_web';
  public statusColor: IconThemeColor = "success";

  public genders: Array<{ text: string, value: number }> = [
    { text: "Male", value: 1 },
    { text: "Female", value: 2 }
];

public buttons: any[] = [
    { text: "Save", isSelected: true },
    { text: "Edit Primary APN",isSelected: false},
    { text: "Refresh Characteristics",isSelected: false },
    { text: "Sales Analysis Report",  isSelected: false },
    { text: "Edit CSA",  selected: false },
  ];


  buttonClicked(selectedButton: any) {
    this.buttons.forEach( btn => {
      btn.isSelected = false;
    });
    selectedButton.isSelected = true;
  }

public selectedChange(btn: any): void {
    this.statusColor = btn.color;
  }
}

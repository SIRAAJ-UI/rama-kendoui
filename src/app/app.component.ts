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
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            DateInputsModule,
            CommonModule,
        TextBoxModule,
        DropDownsModule,
        LayoutModule,
        FormsModule,
        IconsModule,
        ButtonsModule,
        InputsModule,
        LabelModule,
        PBPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assr_csa_web';
  public statusColor: IconThemeColor = "success";

  public genders: Array<{ text: string, value: number }> = [
    { text: "Male", value: 1 },
    { text: "Female", value: 2 }
];

public buttons: any[] = [
    { text: "Save", color: "primary", selected: true },
    { text: "Edit Primary APN",color: "primary" },
    { text: "Refresh Characteristic",  color: "primary" },
    { text: "Sales Analysis Report",  color: "error" },
    { text: "Edit CSA",  color: "error" },

  ];



public selectedChange(btn: any): void {
    this.statusColor = btn.color;
  }
}

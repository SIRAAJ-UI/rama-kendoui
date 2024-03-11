import { Component } from '@angular/core';
import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconThemeColor, IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';

@Component({
  selector: 'app-control-bar',
  standalone: true,
  imports: [
    TextBoxModule,
    DropDownsModule,
    LayoutModule,
    IconsModule,
    ButtonsModule,
    InputsModule,
    LabelModule,
  ],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss',
})
export class ControlBarComponent {
  public statusColor: IconThemeColor = 'success';
  public genders: Array<{ text: string; value: number }> = [
    { text: 'Male', value: 1 },
    { text: 'Female', value: 2 },
  ];

  public buttons: any[] = [
    { text: 'Save', isSelected: true },
    { text: 'Edit Primary APN', isSelected: false },
    { text: 'Refresh Characteristics', isSelected: false },
    { text: 'Sales Analysis Report', isSelected: false },
    { text: 'Edit CSA', selected: false },
  ];

  buttonClicked(selectedButton: any) {
    this.buttons.forEach((btn) => {
      btn.isSelected = false;
    });
    selectedButton.isSelected = true;
  }

  public selectedChange(btn: any): void {
    this.statusColor = btn.color;
  }
}

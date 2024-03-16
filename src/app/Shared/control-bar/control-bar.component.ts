import { Component,ViewChild,Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule } from '@angular/forms';
import { IconThemeColor, IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { SalesInfoTabComponent } from '../../../app/default/cisale-analysis/sales-info-tab/sales-info-tab.component';

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
    SalesInfoTabComponent
  ],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.css',
})
export class ControlBarComponent {
  @ViewChild(SalesInfoTabComponent) salesInfoTabComponent!: SalesInfoTabComponent;
  @Output() saveClick: EventEmitter<string> = new EventEmitter<string>();
 
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
    console.log('button name: '+ selectedButton.text);
    if(selectedButton.text == "Save")
    {
      this.saveClick.emit('Data from child');
    }
  }

  public selectedChange(btn: any): void {
    this.statusColor = btn.color;
  }
}

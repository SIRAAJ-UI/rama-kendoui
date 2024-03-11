import { Component } from '@angular/core';
import { LogoBarComponent } from '../../Shared/logo-bar/logo-bar.component';
import { ControlBarComponent } from '../../Shared/control-bar/control-bar.component';
import { PropCharBarComponent } from '../../Shared/prop-char-bar/prop-char-bar.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesInfoTabComponent } from './sales-info-tab/sales-info-tab.component';
import { TabAlignment } from "@progress/kendo-angular-layout";

@Component({
  selector: 'app-cisale-analysis',
  standalone: true,
  imports: [
    LogoBarComponent,
    ControlBarComponent,
    PropCharBarComponent,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SalesInfoTabComponent,
  ],
  templateUrl: './cisale-analysis.component.html',
  styleUrl: './cisale-analysis.component.scss',
})
export class CISaleAnalysisComponent {
  public alignment: TabAlignment = 'start';
}

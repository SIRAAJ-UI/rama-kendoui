import { Component } from '@angular/core';
import { Event, RouterOutlet } from '@angular/router';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { CommonModule } from '@angular/common';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { PBPageComponent } from './pbpage/pbpage.component';

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
        PBPageComponent
      ],
  templateUrl: './app.component.html',
  styles: [`
        .wrapper {
            display: flex;
            justify-content: center;
        }
        kendo-tabstrip {
            width: 380px;
        }
        .content {
            padding: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        img {
            width: 120px;
            height: 120px;
        }
        h2 {
            font-size: 4em;
            font-weight: lighter;
        }
        h2>span {
            padding-left: 5px;
            font-size: .3em;
            vertical-align: top;
        }
    `]
})
export class AppComponent {
  title = 'assr_csa_web';
  public genders: Array<{ text: string, value: number }> = [
    { text: "Male", value: 1 },
    { text: "Female", value: 2 }
];

//public gender: { text: string, value: number };
}

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule, DialogThemeColor } from '@progress/kendo-angular-dialog';
import { GridModule, GridSize } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';

@Component({
  selector: 'app-comments-block',
  standalone: true,
  imports: [ DialogModule,
    CommonModule,
    InputsModule,
    ButtonsModule,
    LabelModule,
    GridModule,
    ToolBarModule
  ],
  templateUrl: './comments-block.component.html',
  styleUrl: './comments-block.component.css',
})
export class CommentsBlockComponent {
  public smallSize: GridSize = 'small';

  @ViewChild('commentsArea') commentsArea: any;
  public dialogThemeColor: DialogThemeColor = 'primary';
  public gridData: any[] = [
    {
      commentsID: 1,
      comments:
        'The Kendo UI for Angular Grid is one of the most powerful data grid components available for Angular developers. Built from the ground up for Angular and with focus on performance, the Angular Data Grid contains must-have features, including',
    },
    {
      commentsID: 2,
      comments: 'Chang',
    },
    {
      commentsID: 3,
      comments: 'Aniseed Syrup',
    },
    {
      commentsID: 2,
      comments: 'Chang',
    },
    {
      commentsID: 3,
      comments:
        'The Kendo UI for Angular Grid is one of the most powerful data grid components available for Angular developers. Built from the ground up for Angular and with focus on performance, the Angular Data Grid contains must-have features, including',
    },
  ];

  public opened = false;
  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }
}

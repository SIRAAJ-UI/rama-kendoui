import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-dialog-content',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dynamic-dialog-content.component.html',
  styleUrl: './dynamic-dialog-content.component.css'
})
export class DynamicDialogContentComponent {
 @Input("ErrorMessages") ErrorMessages:Array<string> = []
}

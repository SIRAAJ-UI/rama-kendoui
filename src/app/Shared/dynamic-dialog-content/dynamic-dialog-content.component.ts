import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';


@Component({
  selector: 'app-dynamic-dialog-content',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dynamic-dialog-content.component.html',
  styleUrl: './dynamic-dialog-content.component.css'
})
export class DynamicDialogContentComponent {
 @Input("ErrorMessages") ErrorMessages:Array<string> = [];
 @Input() title: string;
 
 constructor( public dialog : DialogRef
 ) {}
 action(action: string) {
  this.dialog.close()
 }
}

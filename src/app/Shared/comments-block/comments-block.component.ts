import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule, DialogThemeColor } from '@progress/kendo-angular-dialog';
import { GridModule, GridSize } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';

import * as Model from '@csa/@core/models/csasalesinfo.model';
import * as Interfaces from '@csa/@core/interfaces/csasalesinfo.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CsaSalesInfoService } from '@csa/@services/CSASalesInfo.service';

@Component({
  selector: 'app-comments-block',
  standalone: true,
  imports: [ DialogModule,
    CommonModule,
    InputsModule,
    ButtonsModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule,
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
  constructor(private csaSalesInfoService: CsaSalesInfoService ) { }
  public gridCommentsData: Array<Model.Comments> = [];
  public commentTitle: string = "";
  public btnLabel: string = "Save";
  public opened = false;
  private allCommentsSubscription: Subscription;
  private addCommentsSubscription: Subscription;
  private updateCommentsSubscription: Subscription;


  public commentsForm = new FormGroup({
    seQ_NUM: new FormControl(null, []),
    commenT_TEXT: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.allCommentsSubscription =  this.csaSalesInfoService.getAllComments().subscribe( (comments:Array<Model.Comments>)  => {
      this.gridCommentsData = comments;
      
    });

  }

  public close(): void {
    this.opened = false;
  }

  public addNewComments(): void {
    this.btnLabel = "Save";
    this.commentTitle = "Add Comment";
    this.opened = true;
    this.commentsForm.reset();
  }

  onSaveUpdate() {
    if(this.commentsForm.valid){

    if(this.btnLabel === "Save"){
      const saveComment: Interfaces.Comments = new Model.Comments();
      saveComment.seQ_NUM = 0;
      saveComment.commenT_TEXT = this.commentsForm.get('commenT_TEXT').value;
      this.addCommentsSubscription = this.csaSalesInfoService.addComments(saveComment).subscribe( (comments: Array<Model.Comments>) => {
        this.gridCommentsData = comments;
        this.opened = false;
      });
    } else {
      const updateComment: Interfaces.Comments = new Model.Comments();
      updateComment.seQ_NUM = this.commentsForm.get('seQ_NUM').value;
      updateComment.commenT_TEXT = this.commentsForm.get('commenT_TEXT').value;
      this.updateCommentsSubscription = this.csaSalesInfoService.updateComments(updateComment).subscribe( (comments: Array<Model.Comments>) => {
        this.gridCommentsData = comments;
        this.opened = false;
      });
    }
  } else {
    alert("error message!")
  }
  };

  onEdit(dataItem: Interfaces.Comments){
    this.btnLabel = "Update";
    this.commentsForm.get('seQ_NUM').setValue(dataItem.seQ_NUM);
    this.commentsForm.get('commenT_TEXT').setValue(dataItem.commenT_TEXT);
    this.commentTitle = "Edit Comment";
    this.opened = true;
  }

  ngOnDestroy() {
    if(this.allCommentsSubscription){
      this.allCommentsSubscription.unsubscribe();
    };
    if(this.addCommentsSubscription){
      this.addCommentsSubscription.unsubscribe();
    };
    if(this.updateCommentsSubscription){
      this.updateCommentsSubscription.unsubscribe();
    };
  }
}

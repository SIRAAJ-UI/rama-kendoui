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
import { CsaSalesInfoService } from '@csa/@services/CSASalesinfo.service';
import { dateInRange } from '@progress/kendo-angular-dateinputs/util';

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
    csA_ID: new FormControl(''),
    entrY_TS: new FormControl(''),
    entrY_WORKER: new FormControl(''),
    updatE_TS: new FormControl(''),
    roW_CHANGE_TS: new FormControl(''),
    entrY_USER: new FormControl(''),
    updatE_USER: new FormControl(''),
    updatE_WORKER: new FormControl(''), 
  });

  constructor(private csaSalesInfoService: CsaSalesInfoService ) { }

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
    if (this.commentsForm.valid) {
      if (this.btnLabel === "Save") {
        const saveComment: Interfaces.Comments = new Model.Comments();    

        saveComment.seQ_NUM = 6;

        saveComment.commenT_TEXT = this.commentsForm.get('commenT_TEXT').value;
        saveComment.csA_ID = 17149;
        saveComment.entrY_TS = new Date();
        saveComment.entrY_WORKER = 'CSM     ';
        saveComment.updatE_TS = new Date();
        saveComment.roW_CHANGE_TS = new Date().toISOString();
        saveComment.entrY_USER = this.commentsForm.get('entrY_USER').value;
        saveComment.updatE_USER = null;
        saveComment.updatE_WORKER = 'CSM     ';

        this.addCommentsSubscription = this.csaSalesInfoService.addComments(saveComment).subscribe((comments: Array<Model.Comments>) => {
          this.gridCommentsData = comments;
          this.opened = false;
        });
      } else {
        const updateComment: Interfaces.Comments = new Model.Comments();
        updateComment.seQ_NUM = this.commentsForm.get('seQ_NUM').value;
        updateComment.commenT_TEXT = this.commentsForm.get('commenT_TEXT').value;

        

        updateComment.csA_ID = this.commentsForm.get('csA_ID').value;
        updateComment.entrY_TS = new Date(this.commentsForm.get('entrY_TS').value);
        updateComment.entrY_WORKER = (this.commentsForm.get('entrY_WORKER').value);
        updateComment.updatE_TS = new Date();
        updateComment.roW_CHANGE_TS = (this.commentsForm.get('roW_CHANGE_TS').value);
        updateComment.entrY_USER = this.commentsForm.get('entrY_USER').value;
        updateComment.updatE_USER = this.commentsForm.get('updatE_USER').value;
        updateComment.updatE_WORKER = this.commentsForm.get('updatE_WORKER').value;




        this.updateCommentsSubscription = this.csaSalesInfoService.updateComments(updateComment).subscribe((comments: Array<Model.Comments>) => {
          this.gridCommentsData = comments;
          this.opened = false;
          console.log('get comments data'+this.commentsForm.value)
      this.csaSalesInfoService.comments = comments;
      console.log("gridCommentsData");
      console.log(this.gridCommentsData);
        });
      }
    } else {
      alert("error message!")
    }
  };

  onEdit(dataItem: Interfaces.Comments){
    this.btnLabel = "Update";
    for (const [key, value] of Object.entries(dataItem)) {
      this.commentsForm.get(key).setValue(value);
    };
    

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

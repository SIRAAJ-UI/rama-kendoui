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
import { Subscription, catchError } from 'rxjs';
import { CsaSalesInfoService } from '@csa/@services/CSASalesinfo.service';
import { dateInRange } from '@progress/kendo-angular-dateinputs/util';
import { QueryParamsService } from '@csa/@services/query-params.service';
import { LoadingService } from '@csa/@services/loading.service';
import { ErrorLoggingService } from "@csa/@services/error-logging.service";
import { HttpErrorResponse } from '@angular/common/http';

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
  public gridCommentsData: Array<Model.comments> = [];
  public commentTitle: string = "";
  public btnLabel: string = "Save";
  public opened = false;
  public seq_num=0;
  private allCommentsSubscription: Subscription;
  private addCommentsSubscription: Subscription;
  private updateCommentsSubscription: Subscription;
  public commentsForm = new FormGroup({
    seq_num: new FormControl(null, []),
    comment_text: new FormControl('', [Validators.required]),
    csa_id: new FormControl(''),
    entry_ts: new FormControl(''),
    entry_worker: new FormControl(''),
    update_ts: new FormControl(''),
    row_change_ts: new FormControl(''),
    entry_user: new FormControl(''),
    update_user: new FormControl(''),
    update_worker: new FormControl(''), 
  });

  constructor(private csaSalesInfoService: CsaSalesInfoService, 
    private loadingService: LoadingService, 
    private errorService: ErrorLoggingService,  
     private _QueryParams: QueryParamsService
    ) { }

  ngOnInit() {
    this.loadingService.showLoading();

    this.allCommentsSubscription =  this.csaSalesInfoService.getAllComments().subscribe( (comments:Array<Model.comments>)  => {
      try {
      
      this.gridCommentsData = comments;
      this.loadingService.hideLoading();
      } catch (e) {
        console.error("Error getting:", e);
        catchError(this.handleError);
        return null;
      }
      
    });

  }
 
  private handleError(err: HttpErrorResponse) {
    return this.errorService.logError(
      2,
      "Error getting property characteristics. " + err.error
    );
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
        const saveComment: Interfaces.comments = new Model.comments();    
        
        saveComment.seq_num = this.gridCommentsData.length+1;

        saveComment.comment_text = this.commentsForm.get('comment_text').value;
        saveComment.csa_id = this._QueryParams.csaId;
        saveComment.entry_ts = new Date();
        saveComment.entry_worker = 'CSM     ';
        saveComment.update_ts = new Date();
        saveComment.row_change_ts = new Date().toISOString();
        saveComment.entry_user = this.commentsForm.get('entry_user').value;
        saveComment.update_user = null;
        saveComment.update_worker = 'CSM     ';

        this.addCommentsSubscription = this.csaSalesInfoService.addComments(saveComment).subscribe((comments: Array<Model.comments>) => {
          this.gridCommentsData = comments;
          this.csaSalesInfoService.comments=null;
          this.csaSalesInfoService.comments = comments;
          this.opened = false;
        });
      } else {
        const updateComment: Interfaces.comments = new Model.comments();
        updateComment.seq_num = this.commentsForm.get('seq_num').value;
        updateComment.comment_text = this.commentsForm.get('comment_text').value;

        

        updateComment.csa_id = this.commentsForm.get('csa_id').value;
        updateComment.entry_ts = new Date(this.commentsForm.get('entry_ts').value);
        updateComment.entry_worker = (this.commentsForm.get('entry_worker').value);
        updateComment.update_ts = new Date().toISOString();
        updateComment.row_change_ts = (this.commentsForm.get('row_change_ts').value);
        updateComment.entry_user = this.commentsForm.get('entry_user').value;
        updateComment.update_user = null;
        updateComment.update_worker = 'CSM     ';



        this.updateCommentsSubscription = this.csaSalesInfoService.updateComments(updateComment).subscribe((comments: Array<Model.comments>) => {
          this.gridCommentsData = comments;
          this.opened = false; 
      this.csaSalesInfoService.comments = comments;
      
        });
      }
    } else {
      alert("error message!")
    }
  };

  onEdit(dataItem: Interfaces.comments){
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

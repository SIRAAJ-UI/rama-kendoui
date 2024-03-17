import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';
import * as Model from '../core/models/csasalesinfo.model';
import * as Interfaces from '../core/interfaces/csasalesinfo.interface';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CSASalesInfoService {
    public salesInfoForm: any;
    public casId: number;
    public seqNum: number;
    public commentText: string;
    public entryTs: Date;
    public entryWorker: string;
    public updateTs: Date;
    public updateWorker: string;
    public comments: Array<Model.Comments> = [];
    constructor(private validatorService: ValidatorService) {
        this.initializeCSASalesForm();
    }

    initializeCSASalesForm() {
        this.salesInfoForm = new FormGroup({
            anticipatedUse: new FormControl('', [Validators.required]),
            details: new FormControl(null, [Validators.required, this.validatorService.validateMaxLength('details', 10)]),
            supervisorApproved: new FormControl(null),
            benchmarkRatings: new FormControl('', [Validators.required, this.validatorService.validateMaxLength('benchmarkRatings', 10)]),
            ownerOccupied: new FormControl('', [Validators.required, this.validatorService.validateMaxLength('ownerOccupied', 10)]),
            brokerInvolved: new FormControl(null, [Validators.required]),
            buyerSellerRelationship: new FormControl(null, [Validators.required]),
            ifBuyerSellerRelationship: new FormControl(null, [Validators.required, this.validatorService.validateMaxLength('ifBuyerSellerRelationship', 10)]),
            purchasePredatedBy: new FormControl(null, [Validators.required]),
            contractDate: new FormControl(null, [Validators.required]),
            conditionAtSales: new FormControl(null, [Validators.required]),
        });
    };

    setCSAData(data: any): void {
        this.casId = data.CSA_ID;
        this.seqNum = data.SEQ_NUM;
        this.commentText = data.COMMENT_TEXT;
        this.entryTs = data.ENTRY_TS;
        this.entryWorker = data.ENTRY_WORKER;
        this.updateTs = data.UPDAte_TS;
        this.updateWorker = data.UPDATE_WORKER;
    };

    salesInfoFormValidation(): Array<string> {
        return this.validatorService.validateForm(this.salesInfoForm.controls);
    };

    addComments(addComment: Interfaces.Comments):Observable<Array<Model.Comments>> {
        console.log(this.comments.length);
        addComment.comm_ID = this.comments.length++;
        this.comments[addComment.comm_ID] = addComment;
        return of(this.comments)
    };

    updateComments(editedComment: Interfaces.Comments):Observable<Array<Model.Comments>> {
        this.comments.forEach( (comment:Interfaces.Comments) => {
            if(comment.comm_ID === editedComment.comm_ID) {
                comment.comm_Text = editedComment.comm_Text;
            }
        });
        return of(this.comments)
    };

    getAllComments():Observable<Array<Model.Comments>> {
        let comment: Interfaces.Comments;
        for (let i = 0; i < 5; i++) {
            comment = new Model.Comments();
            comment.comm_ID = i;
            comment.comm_Text = "Comments" + i;
            this.comments.push(comment)
        }
        return of(this.comments)
    };
}

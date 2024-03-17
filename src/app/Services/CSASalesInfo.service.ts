import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { DataService } from './data.service';
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
    public csaId: number;
    public commentText: string;
    public comments: Array<Model.Comments> = [];

    constructor(private dataService: DataService, private validatorService: ValidatorService) {
        this.initializeCSASalesForm();
    }

    initializeCSASalesForm() {
        this.salesInfoForm = new FormGroup({
            ANTICIPATED_USE_CD: new FormControl('', [Validators.required]),
            PROP_USE_DETL: new FormControl(null, [Validators.required, this.validatorService.validateMaxLength(20)]),
            SUPRV_APPROVED_FL: new FormControl(null),
            BENCHMARK_RATE_CD: new FormControl('', [Validators.required]),
            PCT_OWNER_OCCUP: new FormControl('', [Validators.required, this.validatorService.validateMaxLength(20)]),
            BROKER_INVOLVED_FL: new FormControl(null, [Validators.required]),
            BUY_SELL_REL_FL: new FormControl(null, [Validators.required]),
            BUY_SELL_REL_DESC: new FormControl(null, [Validators.required, this.validatorService.validateMaxLength(10)]),
            PUR_PREDATE_BY_OPT: new FormControl(null, [Validators.required]),
            PREDATE_CONT_DATE: new FormControl(null, [Validators.required]),
            COND_AT_SALE_CD: new FormControl(null, [Validators.required]),
        });
    };

    saveCSASalesForm() {
        let CISalesinfo: any = new Model.CISalesinfo()
        for (let [key, control] of Object.entries(this.salesInfoForm.controls)) {
            CISalesinfo[key] = this.salesInfoForm.get(key).value;
        }
        console.log(CISalesinfo);
        this.dataService.saveRecord(CISalesinfo);
    }

    salesInfoFormValidation(): Array<string> {
        return this.validatorService.validateForm(this.salesInfoForm.controls);
    };

    addComments(addComment: Interfaces.Comments): Observable<Array<Model.Comments>> {
        console.log(this.comments.length);
        addComment.comm_ID = this.comments.length++;
        this.comments[addComment.comm_ID] = addComment;
        return of(this.comments)
    };

    updateComments(editedComment: Interfaces.Comments): Observable<Array<Model.Comments>> {
        this.comments.forEach((comment: Interfaces.Comments) => {
            if (comment.comm_ID === editedComment.comm_ID) {
                comment.comm_Text = editedComment.comm_Text;
            }
        });
        return of(this.comments)
    };

    getAllComments(): Observable<Array<Model.Comments>> {
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

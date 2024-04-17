import { Component } from '@angular/core';
import { CsaSalesInfoService } from '@csa/@services/CSASalesinfo.service';
import { ConstantValueService } from '@csa/@services/constant-values.service';
import { QueryParamsService } from '@csa/@services/query-params.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logo-bar',
  standalone: true,
  imports: [],
  templateUrl: './logo-bar.component.html',
  styleUrl: './logo-bar.component.css'
})
export class LogoBarComponent {
  private titleSubscription: Subscription;
  public lblPageTitleBar: string;
  public lblWorkId:string;
  constructor(private csaSalesInfoService: CsaSalesInfoService,
    private _constantvalues: ConstantValueService,
    private _QueryParams: QueryParamsService
    ) { }
  ngOnInit() { 
    this.lblWorkId=this._QueryParams.workerId;
    this.titleSubscription = this.csaSalesInfoService.GetPageTitleByCSAType(this._constantvalues.pageTiltle_fieldId).subscribe((response: string) => {
      this.lblPageTitleBar = response; 
    });
  }

  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
  }

}

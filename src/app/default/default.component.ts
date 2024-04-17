import { Component } from '@angular/core';
import { LoadingOverlayComponent } from '../Shared/loading-overlay/loading-overlay.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { QueryParamsService } from '../Services/query-params.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { LoadingService } from '@csa/@services/loading.service';


@Component({
  selector: 'app-default',
  standalone: true,
  imports: [HttpClientModule, ButtonsModule, LoadingOverlayComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.css',
  providers: [DataService],
})
export class DefaultComponent {
  loadingText: string = 'Loading...';
  private _csaID: string | undefined;
  private _ieMode: string | undefined;
  private _workerID: string | undefined;
  private _CSAType: string | undefined;
  private _leaseID: number | undefined;
  private _leasePID: number | undefined;
  private _TryInteger: number | undefined;
  private _wksType: string | undefined; // Change to string, as TypeScript does not have Char type
  private _actTrackID: number | undefined;
  private _docSeries: number | undefined;
  private _docPrefix: string | undefined;
  // future implementation for accessbility
  private _actTrackIDStr: string | undefined;
  private _docSeriesStr: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _DataService: DataService,
    private _QueryParams: QueryParamsService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit():void {
    try {
      let _errText: string = '';
      let _rc: number;
      let _title: string | undefined;
      let eventTs: string = '';
      let propertyId: number | undefined;
      let csaWksNum: number | undefined;

      this.loadingService.showLoading();
      // Check token passed in match the one stored, go to error page
      this.checkToken();
      console.log("current token status is: " + this.authService.isAuthenticated);
      if (!this.authService.isAuthenticated) {
        this.loadingService.hideLoading();
        this.router.navigate(['/error']);
      }
      
      this._CSAType = this.checkCSAType();
      this.router.navigate(['../error']);

      switch (this._CSAType) {
        // For lease
        case '863':
          this._leasePID = this.checkLsePID();
          break;
        // For worksheet
        case '395':
          if (this.route.snapshot.queryParams['WKSType']) {
            this._wksType = this.route.snapshot.queryParams['WKSType'];
          }

          if (this.route.snapshot.queryParams['ActTrackID']) {
            this._actTrackID = +this.route.snapshot.queryParams['ActTrackID'];
          }

          if (this.route.snapshot.queryParams['DocPrefix']) {
            this._docPrefix = this.route.snapshot.queryParams['DocPrefix'];
          }

          if (this.route.snapshot.queryParams['DocSeries']) {
            this._docSeries = +this.route.snapshot.queryParams['DocSeries'];
          }

          if (this.route.snapshot.queryParams['csaWksNum']) {
            csaWksNum = +this.route.snapshot.queryParams['csaWksNum'];
          }

          let isPropID = false;
          if (this.route.snapshot.queryParams['PropertyId']) {
            isPropID = true;
            propertyId = this.route.snapshot.queryParams['PropertyId'];
          }

          if (!this._actTrackID && csaWksNum === 0) {
            if (this._docPrefix && this._docSeries && !isPropID) {
              throw new Error('Missing Property ID.');
            }
          }

          if (this.route.snapshot.queryParams['eventTs']) {
            eventTs = this.route.snapshot.queryParams['eventTs'];
          }

          break;
        // Add more cases for other CSA Types if needed
      }

      // Get from Querysring and assigning to queryParam service

      this._ieMode = this.checkIEMode();
      this._workerID = this.checkWorkerID();

      if (this._workerID !== undefined)
        this._QueryParams.workerId = this._workerID;

      // TODO: need future work
      if (this._CSAType === '395') {
        
        if (this._actTrackID !== undefined) {
          // Handle initialization based on _actTrackID
        } else if (csaWksNum !== undefined && csaWksNum > 0) {
          // Handle initialization based on csaWksNum
        } else if (this._docSeries !== undefined) {
          // Handle initialization based on _docPrefix, _docSeries, propertyId, eventTs
        } else {
          // Handle default initialization
        }
        this._QueryParams.ieMode = this._ieMode;
      } 
      
      else if (this._CSAType === '863') {
        this._QueryParams.ieMode = this._ieMode;
        if (this._leasePID != undefined)
          this._QueryParams.leasePropertyId = this._leasePID.toString();
      } 

      this._csaID = this.checkCSAID();
      this.loadingService.hideLoading();
      
      if (!this.authService.isAuthenticated) {
        this._CSAType = 'Err';
      }
      switch (this._CSAType) {
        case 'Err':
          this.router.navigate(['/error']);
          break;
        case '933':
          this.router.navigate(['/CISalesAnalysis']);
          break;
        case '934':
          this.router.navigate(['/VacantLandInput']);
          break;
        case '863':
          this.router.navigate(['/CSALeaseList']);
          break;
        case '395':
          this.router.navigate(['/WksDefault']);
          break;
        default:
          throw new Error('Invalid CSA Type.');
      }
    } catch (error) {
      // Handle errors appropriately
    }
  }

  private checkCSAType(): string {
    const csaType = this.route.snapshot.queryParams['CSAType'];

    if (!csaType || csaType.toString().trim().length === 0) {
      this.router.navigate(['/error']);
      throw new Error('Missing CSA Type.');
    }
    this._QueryParams.csaType = csaType;
    return csaType.trim();
  }

  private checkLseID(): number {
    const lseID = this.route.snapshot.queryParams['LseID'];

    if (!lseID || lseID.toString().trim().length === 0) {
      this.router.navigate(['/error']);
      throw new Error('Missing Lease ID.');
    }

    if (Number.isInteger(+lseID)) {
      this._QueryParams.leaseId = lseID;
      return +lseID;
    }
    this.router.navigate(['/error']);
    throw new Error('Missing Lease ID.');
  }

  private checkCSAID(): string {
    const csaID: string= this.route.snapshot.queryParams['CSAID'];

    if (!csaID || csaID.toString().trim().length === 0) {
      this.router.navigate(['/error']);
      throw new Error('Missing CSA ID.');
    }

    if (Number.isInteger(parseInt(csaID))) {
      this._QueryParams.csaId = parseInt(csaID);
      return csaID;
    }
    this.router.navigate(['/error']);
    throw new Error('Missing CSA ID.');
  }

  private checkIEMode(): string {
    const ieMode = this.route.snapshot.queryParams['IEMode'];

    if (!ieMode || ieMode.toString().trim().length === 0) {
      this.router.navigate(['/error']);
      throw new Error('Missing transaction mode.');
    }
    this._QueryParams.ieMode = ieMode;
    return ieMode;
  }

  private checkWorkerID(): string {
    const workerID = this.route.snapshot.queryParams['WorkerID'];

    if (!workerID || workerID.toString().trim().length === 0) {
      this.router.navigate(['/error']);
      throw new Error('Missing Worker ID.');
    }
    this._QueryParams.workerId = workerID;
    return workerID;
  }

  private checkLsePID(): number {
    const lsePID = this.route.snapshot.queryParams['LsePID'];

    if (!lsePID || lsePID.toString().trim().length === 0) {
      this.router.navigate(['/error']);
      throw new Error('Missing Property ID.');
    }

    if (Number.isInteger(+lsePID)) {
      this._QueryParams.leasePropertyId = lsePID;
      return +lsePID;
    }
    this.router.navigate(['/error']);
    throw new Error('Missing Property ID.');
  }
  // test push

  private checkToken() {
    const csaToken = this.route.snapshot.queryParams['Token'];
    if (!csaToken || csaToken.toString().trim().length === 0) {
      this.loadingService.hideLoading();
      this.router.navigate(['/error']);

      throw new Error('Missing Token');
    }
    this.authService.authenticate(csaToken);
    
  }
}

import { Component } from '@angular/core';
import { LoadingOverlayComponent } from '../Shared/loading-overlay/loading-overlay.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { QueryParamsService } from '../Services/query-params.service';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [ HttpClientModule, ButtonsModule, LoadingOverlayComponent, ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.css',
  providers: [ DataService ]
})
export class DefaultComponent {
  loadingText: string = 'Loading...';
  private _csaID: number | undefined;
  private _ieMode: string | undefined;
  private _workerID: string | undefined;
  private _CSAType: string | undefined;
  private _sessionIDString: string | undefined;
  private _leaseID: number | undefined;
  private _leasePID: number | undefined;
  private _TryInteger: number | undefined;
  private _wksType: string | undefined; // Change to string, as TypeScript does not have Char type
  private _actTrackID: number | null = null; // Nullable type in TypeScript
  private _docSeries: number | null = null; // Nullable type in TypeScript
  private _docPrefix: string | undefined;
  private _actTrackIDStr: string | undefined;
  private _docSeriesStr: string | undefined;
  constructor(private route: ActivatedRoute, private router: Router,
              private _DataService: DataService, private _QueryParams: QueryParamsService) { }

  async ngOnInit(): Promise<void> {
    try {
      let _errText: string = "";
      let _rc: number;
      let _sessionID: number;
      let _title: string | undefined;
      let eventTs: string = "";
      let propertyId: number | undefined;
      let csaWksNum: number | undefined;

      // Check Session
      _sessionID = this.checkSession();

      // Check for CSAStartDt
      if (!sessionStorage.getItem('CSAStartDt')) {
        sessionStorage.setItem('CSAStartDt', new Date().toLocaleString('en-US', { hour12: false }));
      }

      // Check for CSAType
      this._CSAType = this.checkCSAType();

      // Check for whatever ID is applicable depending on the CSA Type
      switch (this._CSAType) {
        // For lease
        case '863':
          this._leasePID = this.checkLsePID();
          break;
        case '395':
          // For worksheet
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

      // Check for IEMode
      this._ieMode = this.checkIEMode();

      // Validations complete, fetch header data, store in session
      if (this._CSAType === '395') {
        try {
          _title = await this._DataService.getPageTitleByCSAType(395).toPromise();
        } catch (error) {
          // TODO: Add error logging logic based on design
        }
        if (this._actTrackID !== undefined) {
          // Handle initialization based on _actTrackID
        } else if (csaWksNum !== undefined && csaWksNum > 0) {
          // Handle initialization based on csaWksNum
        } else if (this._docSeries !== undefined) {
          // Handle initialization based on _docPrefix, _docSeries, propertyId, eventTs
        } else {
          // Handle default initialization
        }
        sessionStorage.setItem('SalesCompInfo', JSON.stringify({
          Region: 'YourDatabaseRegion',
          WorkerID: this.route.snapshot.queryParams['WorkerID'],
          CSAType: this._CSAType,
          Title: _title,
          IEMode: this._ieMode
        }));
        if (this._workerID !== undefined)
          sessionStorage.setItem('WorkerID', this._workerID); // This is added here for now because we need this in the popup, work on it later
        sessionStorage.setItem('IEMode', this._ieMode);
      } else if (this._CSAType === '863') {
        sessionStorage.setItem('IEMode', this._ieMode);
        if (this._workerID !== undefined)
          sessionStorage.setItem('WorkerID', this._workerID);
        if (this._leasePID != undefined)
          sessionStorage.setItem('LsePID', this._leasePID.toString());
      } else {
        // Handle other CSA Types
        if(this._CSAType == "933" || this._CSAType == "934") {
          this._csaID = this.checkCSAID();
          sessionStorage.setItem('CSAID', this._csaID.toString());
          sessionStorage.setItem('IEMode', this._ieMode);
        }
        if (this._workerID !== undefined)
          sessionStorage.setItem('WorkerID', this._workerID);
      }

      sessionStorage.setItem('CSAType', this._CSAType);

      // Redirect to web pages depending on the csa_type
      switch (this._CSAType) {
        case '933':
          this.router.navigate(['/csainput/CISaleAnalysis']);
          break;
        case '934':
          this.router.navigate(['/csainput/VacantLandInput']);
          break;
        case '863':
          this.router.navigate(['/csainput/CSALeaseList']);
          break;
        case '395':
          this.router.navigate(['/CSAComps/WksDefault']);
          break;
        default:
          throw new Error('Invalid CSA Type.');
      }
    } catch (error) {
      // Handle errors appropriately
    }
  }

  private checkSession(): number {
    const sessionId = this.route.snapshot.queryParams['SessionID'];

    if (!sessionId || sessionId.toString().trim().length === 0) {
      throw new Error('Missing Session ID.');
    }

    if (Number.isInteger(+sessionId)) {
      this._QueryParams.sessionId = sessionId;
      return +sessionId;
    }

    throw new Error('Missing Session ID.');
  }

  private checkCSAType(): string {
    const csaType = this.route.snapshot.queryParams['CSAType'];

    if (!csaType || csaType.toString().trim().length === 0) {
      throw new Error('Missing CSA Type.');
    }
    this._QueryParams.csaType = csaType;
    return csaType.trim();
  }

  private checkLseID(): number {
    const lseID = this.route.snapshot.queryParams['LseID'];

    if (!lseID || lseID.toString().trim().length === 0) {
      throw new Error('Missing Lease ID.');
    }

    if (Number.isInteger(+lseID)) {
      this._QueryParams.leaseId = lseID;
      return +lseID;
    }

    throw new Error('Missing Lease ID.');
  }

  private checkCSAID(): number {
    const csaID = this.route.snapshot.queryParams['CSAID'];

    if (!csaID || csaID.toString().trim().length === 0) {
      throw new Error('Missing CSA ID.');
    }

    if (Number.isInteger(csaID)) {
      this._QueryParams.csaId = csaID;
      return csaID;
    }

    throw new Error('Missing CSA ID.');
  }

  private checkIEMode(): string {
    const ieMode = this.route.snapshot.queryParams['IEMode'];

    if (!ieMode || ieMode.toString().trim().length === 0) {
      throw new Error('Missing transaction mode.');
    }
    this._QueryParams.ieMode = ieMode;
    return ieMode;
  }

  private checkWorkerID(): string {
    const workerID = this.route.snapshot.queryParams['WorkerID'];

    if (!workerID || workerID.toString().trim().length === 0) {
      throw new Error('Missing Worker ID.');
    }
    this._QueryParams.workerId = workerID;
    return workerID;
  }

  private checkLsePID(): number {
    const lsePID = this.route.snapshot.queryParams['LsePID'];

    if (!lsePID || lsePID.toString().trim().length === 0) {
      throw new Error('Missing Property ID.');
    }

    if (Number.isInteger(+lsePID)) {
      this._QueryParams.leasePropertyId = lsePID;
      return +lsePID;
    }

    throw new Error('Missing Property ID.');
  }
  
  public onButtonClick(): void {
    console.log("click");
  }
}


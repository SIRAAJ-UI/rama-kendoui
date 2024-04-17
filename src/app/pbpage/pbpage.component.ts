import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
// TODO: Cleanup

@Component({
  selector: 'app-pbpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pbpage.component.html',
  styleUrl: './pbpage.component.css',
})
export class PBPageComponent {
  csaType: string = '';
  csaID: string = '';
  actTrackID: string = '';
  docPrefix: string = '';
  docSeries: string = '';
  eventTs: string = '';
  propertyId: string = '';
  csaWksNum: string = '';
  mode: string = '';
  workerID: string = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  // Add similar variables for other form items
  showCSAID: boolean = true;
  showActTrackID: boolean = true;
  showDocPrefix: boolean = true;
  showDocSeries: boolean = true;
  showEventTs: boolean = true;
  showPID: boolean = true;
  showCSAWks: boolean = true;
  // showMode: boolean = false;
  // showWorkerID: boolean = false;
  // showFileNetTest: boolean = false;

  hideShowItems(): void {
    const csaTypeStr: string = (this.csaType || '').trim().toUpperCase();

    switch (csaTypeStr) {
      case '934':
      case '933':
        this.showCSAID = true;
        this.showActTrackID = false;
        this.showDocPrefix = true;
        this.showDocSeries = true;
        this.showPID = false;
        this.showEventTs = false;
        this.showCSAWks = false;
        break;

      case 'WKS':
        this.showCSAID = false;
        this.showActTrackID = true;
        this.showDocPrefix = true;
        this.showDocSeries = true;
        this.showPID = true;
        this.showEventTs = true;
        this.showCSAWks = true;
        break;

      case '863':
        this.showCSAID = false;
        this.showActTrackID = false;
        this.showDocPrefix = false;
        this.showDocSeries = false;
        this.showPID = true;
        this.showEventTs = false;
        this.showCSAWks = false;
        break;

      default:
        // Handle other cases if needed
        break;
    }
  }

  async btnDefault_Click(): Promise<void> {
    let csaID: string = this.csaID.trim();
    let mode: string = this.mode.trim().toUpperCase();
    let worker: string = this.workerID.trim().toUpperCase();
    let actTrackID: string = this.actTrackID.trim();
    let docPrefix: string = this.docPrefix.trim();
    let docSeries: string = this.docSeries.trim();
    let propID: string = this.propertyId.trim();
    let eventTs: string = this.eventTs.trim();
    let csaWksNum: string = this.csaWksNum.trim();
    let qstr: string | null = null;
    let queryParams: NavigationExtras = {};

    // Get token from backend api and store in local storage
    let JWTtoken = await firstValueFrom(this.auth.getToken());
    // After set, token will be removed after 1 hour by default
    this.auth.setToken(JWTtoken);
    // localStorage.setItem('token', JWTtoken);

    // This code is added because from PB Page can continue to use WKS but from PB its going to be 395
    let csaTypeStr: string = this.csaType.trim().toUpperCase();
    switch (csaTypeStr) {
      case '934':
      case '933':
        // TODO: make sure to apply this format of query string passing to 
        // other CSATypes.
        queryParams = {
          queryParams: {
            CSAType: csaTypeStr,
            CSAID: csaID,
            IEMode: mode,
            WorkerID: worker,
            Token: JWTtoken,
          },
        };
        this.router.navigate(['/default'], queryParams);
        break;

      case 'WKS':
        csaTypeStr = '395';
        eventTs = encodeURIComponent(eventTs);
        qstr = `?ActTrackID=${actTrackID}&DocPrefix=${docPrefix}&DocSeries=${docSeries}&PropertyId=${propID}&eventTs=${eventTs}&csaWksNum=${csaWksNum}&IEMode=${mode}&WorkerID=${worker}&CSAType=${csaTypeStr}&SessionID=1`;
        break;

      case '863':
        qstr = `?LsePID=${propID}&IEMode=${mode}&WorkerID=${worker}&CSAType=${csaTypeStr}&SessionID=1`;
        break;

      default:
        // Handle other cases if needed
        break;
    }

    if (queryParams) {
      // TODO: rem to remove this
      //this.router.navigate(['/default'], { queryParams: { qstr } });
      this.router.navigate(['/default'], queryParams);
    }
  }
}

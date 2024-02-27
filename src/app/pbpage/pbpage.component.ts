import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pbpage',
  standalone: true,
  imports: [FormsModule,
            CommonModule],
  templateUrl: './pbpage.component.html',
  styleUrl: './pbpage.component.css'
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
  constructor(private router: Router) { }

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

  btnDefault_Click(): void {
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

    // This code is added because from PB Page can continue to use WKS but from PB its going to be 395
    let csaTypeStr: string = this.csaType.trim().toUpperCase();

    switch (csaTypeStr) {
      case '934':
      case '933':
        qstr = `?CSAID=${csaID}&IEMode=${mode}&WorkerID=${worker}&CSAType=${csaTypeStr}&SessionID=1`;
        if (mode === 'A') {
          qstr += `&DocPrefix=${docPrefix}&DocSeries=${docSeries}`;
        }
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

    if (qstr) {
      // TODO: rem to remove this
      console.log(qstr);
      this.router.navigate(['/default'], { queryParams: { qstr } });
    }
  }
}
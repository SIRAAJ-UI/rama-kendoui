
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataService } from '../../Services/data.service';


@Component({
  selector: 'app-pop-report-viewer',
  standalone: true,
  imports: [],
  templateUrl: './pop-report-viewer.component.html',
  styleUrl: './pop-report-viewer.component.css',
})
export class PopReportViewerComponent {
  reportUrl: string = environment.reportViewer;
  postParams = {
    fromDate: '',
    toDate: '',
    reportName: '',
    reportType: '',
    environment: environment.currentEnvironment,
  };
  constructor(private dataService: DataService) {}

  private getReport() {
    // Use postParams with Data service to contact power BI report server
    // After correct report is retrived, it will be display with report
    // viewer page
  }
}

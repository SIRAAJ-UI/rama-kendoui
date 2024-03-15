import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.dev';


@Component({
  selector: 'app-pop-report-viewer',
  standalone: true,
  imports: [],
  templateUrl: './pop-report-viewer.component.html',
  styleUrl: './pop-report-viewer.component.css'
})
export class PopReportViewerComponent {
  reportUrl: string = environment.reportViewer
}

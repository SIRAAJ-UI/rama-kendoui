import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../Services/loading.service';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css'
})
export class LoadingOverlayComponent {
  constructor(public loadingService: LoadingService) { }
}

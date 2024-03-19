import { Component } from '@angular/core';
import { CsaSalesInfoService } from '@csa/@services/CSASalesInfo.service';
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
  
  constructor(private csaSalesInfoService: CsaSalesInfoService) { }
  ngOnInit() {
    this.titleSubscription = this.csaSalesInfoService.GetPageTitleByCSAType(113).subscribe((response: string) => {
      this.lblPageTitleBar = response;
    });
  }

  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
  }

}

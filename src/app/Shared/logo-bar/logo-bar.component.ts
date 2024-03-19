import { Component } from '@angular/core'; 
import { DataService } from '@csa/@services/data.service';


@Component({
  selector: 'app-logo-bar',
  standalone: true,
  imports: [],
  templateUrl: './logo-bar.component.html',
  styleUrl: './logo-bar.component.css'
})
export class LogoBarComponent {

  lblPageTitleBar:any;
  constructor(private _DataService: DataService){}
  ngOnInit()
  {
    this.GetPageTitleByCSAType();

  }
  private GetPageTitleByCSAType(){
  this._DataService.getPageTitleByCSAType(113).subscribe((response) => {
    this.lblPageTitleBar = response; 
  },
  (error) => {
    console.error(error);
     
  });
}
}

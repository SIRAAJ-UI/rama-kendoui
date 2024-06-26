import { Component } from '@angular/core';
import { CsaSalesInfoService } from '@csa/@services/CSASalesinfo.service';
import { ReactiveFormsModule } from '@angular/forms';

import * as Model from '@csa/@core/models/csasalesinfo.model';
import * as Interfaces from '@csa/@core/interfaces/csasalesinfo.interface';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-prop-char-bar',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './prop-char-bar.component.html',
  styleUrl: './prop-char-bar.component.css'
})
export class PropCharBarComponent {
  ProprtyInfo: Interfaces.propertyinfo = new Model.propertyinfo();
  constructor(     private csaSalesInfoService: CsaSalesInfoService,
  ) {

  }

  ngOnInit() {
    this.csaSalesInfoService.PropertyInfo.subscribe((proprtyinfo: Interfaces.propertyinfo) => {
      this.ProprtyInfo = proprtyinfo; 
    });
   
  }


}

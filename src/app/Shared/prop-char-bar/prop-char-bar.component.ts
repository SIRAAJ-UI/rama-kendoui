import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CsaSalesInfoService } from '@csa/@services/CSASalesInfo.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-prop-char-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './prop-char-bar.component.html',
  styleUrl: './prop-char-bar.component.css'
})
export class PropCharBarComponent {
  lblDocPrefix:any;
  propCharForm:FormGroup;
constructor(private csaSalesInfoService: CsaSalesInfoService){
this.propCharForm = this.csaSalesInfoService.propCharForm;
}

   
}

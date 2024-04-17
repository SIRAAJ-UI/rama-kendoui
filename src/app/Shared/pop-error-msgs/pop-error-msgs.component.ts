import { Component } from '@angular/core';
import { ResourceService } from '../../Services/resource.service';
import { ReplacePlaceholderPipe } from '../Pipes/replace-placeholder.pipe';
import { CommonModule } from '@angular/common';
import Resource from '../../../assets/Resource.json';

@Component({
  selector: 'app-pop-error-msgs',
  standalone: true,
  imports: [ReplacePlaceholderPipe, CommonModule],
  templateUrl: './pop-error-msgs.component.html',
  styleUrl: './pop-error-msgs.component.css',
})
export class PopErrorMsgsComponent {
  resources: any;

  constructor(private resourceService: ResourceService) {}
  ngOnInit(): void {
    // this.resourceService.getResources().subscribe((data:any) => {
    //   this.resources = data;
    // });
    this.resources = this.resourceService.getResources();
    this.resources = Resource;
  }
}

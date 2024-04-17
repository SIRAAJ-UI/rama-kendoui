import { Injectable } from '@angular/core';
import Resource from '../../assets/Resource.json';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  // Extra service layer for resource file handling
  constructor() {}
  getResources(): any {
    return Resource;
  }
}

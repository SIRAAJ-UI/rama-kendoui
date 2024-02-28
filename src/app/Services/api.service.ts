import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.BaseURL;
  private baseCSAApi = '${this.baseUrl}/csa/api';
  
  constructor() { }
}

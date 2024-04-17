import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorLoggingService } from './error-logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private errorLoggingService: ErrorLoggingService) { }
  handleError(error: any): void {
    // Handle the error with logError function in injected service
    this.errorLoggingService.logError(2, 'Generic expression');
  }
}

import { TestBed } from '@angular/core/testing';

import { CSASaleAdjustmentsService } from './csasale-adjustments.service';

describe('CSASaleAdjustmentsService', () => {
  let service: CSASaleAdjustmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSASaleAdjustmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

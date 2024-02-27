import { TestBed } from '@angular/core/testing';

import { CSASaleExpensesService } from './csasale-expenses.service';

describe('CSASaleExpensesService', () => {
  let service: CSASaleExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSASaleExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

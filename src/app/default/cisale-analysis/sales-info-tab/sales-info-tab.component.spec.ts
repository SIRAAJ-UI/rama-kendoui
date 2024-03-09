import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInfoTabComponent } from './sales-info-tab.component';

describe('SalesInfoTabComponent', () => {
  let component: SalesInfoTabComponent;
  let fixture: ComponentFixture<SalesInfoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInfoTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

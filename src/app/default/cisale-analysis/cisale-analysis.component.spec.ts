import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CISaleAnalysisComponent } from './cisale-analysis.component';

describe('CISaleAnalysisComponent', () => {
  let component: CISaleAnalysisComponent;
  let fixture: ComponentFixture<CISaleAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CISaleAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CISaleAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

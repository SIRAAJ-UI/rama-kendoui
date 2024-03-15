import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopReportViewerComponent } from './pop-report-viewer.component';

describe('PopReportViewerComponent', () => {
  let component: PopReportViewerComponent;
  let fixture: ComponentFixture<PopReportViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopReportViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

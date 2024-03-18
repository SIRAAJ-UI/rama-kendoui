import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDialogContentComponent } from './dynamic-dialog-content.component';

describe('DynamicDialogContentComponent', () => {
  let component: DynamicDialogContentComponent;
  let fixture: ComponentFixture<DynamicDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDialogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

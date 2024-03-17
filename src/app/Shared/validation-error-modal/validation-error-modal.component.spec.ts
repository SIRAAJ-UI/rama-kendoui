import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorModalComponent } from './validation-error-modal.component';

describe('ValidationErrorModalComponent', () => {
  let component: ValidationErrorModalComponent;
  let fixture: ComponentFixture<ValidationErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationErrorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSetGroupComponent } from './field-set-group.component';

describe('FieldSetGroupComponent', () => {
  let component: FieldSetGroupComponent;
  let fixture: ComponentFixture<FieldSetGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldSetGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldSetGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

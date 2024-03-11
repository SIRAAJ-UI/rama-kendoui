import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiExpensiveComponent } from './ci-expensive.component';

describe('CiExpensiveComponent', () => {
  let component: CiExpensiveComponent;
  let fixture: ComponentFixture<CiExpensiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiExpensiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiExpensiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

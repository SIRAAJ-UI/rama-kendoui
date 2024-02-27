import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropCharComponent } from './prop-char.component';

describe('PropCharComponent', () => {
  let component: PropCharComponent;
  let fixture: ComponentFixture<PropCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropCharComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropCharBarComponent } from './prop-char-bar.component';

describe('PropCharBarComponent', () => {
  let component: PropCharBarComponent;
  let fixture: ComponentFixture<PropCharBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropCharBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropCharBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

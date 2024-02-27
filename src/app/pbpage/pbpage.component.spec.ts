import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbpageComponent } from './pbpage.component';

describe('PbpageComponent', () => {
  let component: PbpageComponent;
  let fixture: ComponentFixture<PbpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PbpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PbpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

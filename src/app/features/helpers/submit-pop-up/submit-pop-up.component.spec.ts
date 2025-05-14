import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPopUpComponent } from './submit-pop-up.component';

describe('SubmitPopUpComponent', () => {
  let component: SubmitPopUpComponent;
  let fixture: ComponentFixture<SubmitPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

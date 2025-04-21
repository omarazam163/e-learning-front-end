import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorContactComponent } from './instructor-contact.component';

describe('InstructorContactComponent', () => {
  let component: InstructorContactComponent;
  let fixture: ComponentFixture<InstructorContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

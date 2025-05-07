import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizComponent } from './add-quiz.component';

describe('AddQuizComponent', () => {
  let component: AddQuizComponent;
  let fixture: ComponentFixture<AddQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSolveFormComponent } from './question-solve-form.component';

describe('QuestionSolveFormComponent', () => {
  let component: QuestionSolveFormComponent;
  let fixture: ComponentFixture<QuestionSolveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionSolveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionSolveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuizComponent } from './edit-quiz.component';

describe('EditQuizComponent', () => {
  let component: EditQuizComponent;
  let fixture: ComponentFixture<EditQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

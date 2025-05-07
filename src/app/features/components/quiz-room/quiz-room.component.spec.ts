import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRoomComponent } from './quiz-room.component';

describe('QuizRoomComponent', () => {
  let component: QuizRoomComponent;
  let fixture: ComponentFixture<QuizRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

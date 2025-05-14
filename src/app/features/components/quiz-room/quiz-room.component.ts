import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { QuizService } from '../../../core/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../../shared/interfaces/quiz';
import { QuestionSolveFormComponent } from '../question-solve-form/question-solve-form.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PopUpComponent } from '../../helpers/pop-up/pop-up.component';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../shared/interfaces/course';
import { SubmitPopUpComponent } from '../../helpers/submit-pop-up/submit-pop-up.component';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-quiz-room',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    QuestionSolveFormComponent,
    ReactiveFormsModule,
    MatProgressBarModule,
    PopUpComponent,
    SubmitPopUpComponent,
  ],
  templateUrl: './quiz-room.component.html',
  styleUrl: './quiz-room.component.scss',
})
export class QuizRoomComponent {
  parseInt(arg0: number) {
    throw new Error('Method not implemented.');
  }
  //form
  QuizForm = new FormGroup({
    QuesAnswers: new FormArray([]),
  });

  //services
  _quizService = inject(QuizService);
  _ActiveRoute = inject(ActivatedRoute);
  _CourseService = inject(CoursesService);
  _AuthService = inject(AuthService);
  //varibles
  QuizData!: Quiz;
  QuizId!: number;
  CourseData!: Course;
  ShowSubmitAlert = signal<boolean>(false);
  currentStep = signal<number>(0);
  QuestionSolved = signal<number>(0);
  QuesAnswers: FormArray = this.QuizForm.get('QuesAnswers') as FormArray;
  score = signal<number>(0);
  showScorePopup = signal<boolean>(false);
  ngOnInit(): void {
    this._ActiveRoute.params.subscribe((params) => {
      this.QuizId = params['quizId'];
    });
    this._quizService.getQuizWithId(this.QuizId).subscribe((res: Quiz) => {
      this.QuizData = res;
      this.addQuestionToFormArray(this.QuizData.questions.length);
      this._CourseService
        .getCourseById(this.QuizData.courseId)
        .subscribe((res) => {
          this.CourseData = res;
        });
    });

    this.QuesAnswers.valueChanges.subscribe((res) => {
      this.QuestionSolved.set(0);
      for (let i = 0; i < this.QuesAnswers.controls.length; i++) {
        if (this.QuesAnswers.controls.at(i)?.touched) {
          this.QuestionSolved.update((val) => val + 1);
        }
      }
    });
  }

  addQuestionToFormArray(numberOfQues: number) {
    for (let i = 0; i < numberOfQues; i++)
      this.QuesAnswers.push(new FormControl(false));
  }

  handleNextStep() {
    this.currentStep.update((val) => val + 1);
  }

  handlePrevStep() {
    this.currentStep.update((val) => val - 1);
  }

  openSubmitAlert() {
    this.ShowSubmitAlert.set(true);
  }

  closeSubmitAlert() {
    this.ShowSubmitAlert.set(false);
  }

  handleSubmit() {
    this.score.set(this.calcScore());
    this.ShowSubmitAlert.set(false);
    this.showScorePopup.set(true);
    this._quizService
      .submitQuiz(
        this.QuizId,
        this._AuthService.UserData.getValue().roleId,
        this.score()
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  calcScore(): number {
    let Score = 0;
    this.QuesAnswers.controls.forEach((control, index) => {
      if (control.value) {
        Score += 1;
      }
    });
    return Score;
  }
}

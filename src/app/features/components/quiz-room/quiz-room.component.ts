import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { QuizService } from '../../../core/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../../shared/interfaces/quiz';
import {QuestionSolveFormComponent} from '../question-solve-form/question-solve-form.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-quiz-room',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    QuestionSolveFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './quiz-room.component.html',
  styleUrl: './quiz-room.component.scss',
})
export class QuizRoomComponent {
  //form
  QuizForm = new FormGroup({
    QuesAnswers: new FormArray([]),
  });

  //services
  _quizService = inject(QuizService);
  _ActiveRoute = inject(ActivatedRoute);
  //varibles
  QuizData!: Quiz;
  QuizId!: number;
  currentStep = signal<number>(0);
  QuesAnswers: FormArray = this.QuizForm.get('QuesAnswers') as FormArray;
  ngOnInit(): void {
    this._ActiveRoute.params.subscribe((params) => {
      this.QuizId = params['quizId'];
    });
    this._quizService.getQuizWithId(this.QuizId).subscribe((res: Quiz) => {
      this.QuizData = res;
      this.addQuestionToFormArray(this.QuizData.questions.length);
    });

    this.QuizForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  addQuestionToFormArray(numberOfQues: number) {
    for (let i=0;i<numberOfQues;i++) this.QuesAnswers.push(new FormControl(false));
  }

  handleNextStep() {
    this.currentStep.update((val)=>val+1);
  }

  handlePrevStep() {
    this.currentStep.update((val)=>val-1);
  }
}

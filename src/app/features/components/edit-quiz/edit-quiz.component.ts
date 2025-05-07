import { Component, inject, signal } from '@angular/core';
import { QuestionFormComponent } from '../question-form/question-form.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../core/services/quiz.service';
import { Quiz } from '../../../shared/interfaces/quiz';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-quiz',
  imports: [ReactiveFormsModule, QuestionFormComponent, CommonModule],
  templateUrl: './edit-quiz.component.html',
  styleUrl: './edit-quiz.component.scss',
})
export class EditQuizComponent {
  // services
  _activeRoute = inject(ActivatedRoute);
  _quizService = inject(QuizService);
  _Router = inject(Router);

  Questions!: FormArray;
  QuizForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    questions: new FormArray([]),
  });

  // variables
  QuizData!: Quiz;
  QuizId!: number;
  isloading = signal(false);
  valid = signal(false);
  ngOnInit() {
    this.QuizForm.valueChanges.subscribe((value) => {
      this.valid.set(this.QuizForm.valid);
    });
    this._activeRoute.params.subscribe((params) => {
      this.QuizId = params['quizId'];
    });

    this._quizService.getQuizWithId(this.QuizId).subscribe((res: Quiz) => {
      this.QuizData = res;
      this.setOldQuizData();
    });
  }

  setOldQuizData() {
    this.QuizForm.get('title')?.setValue(this.QuizData.title);
    this.QuizData.questions.forEach((question) => {
      (this.QuizForm.get('questions') as FormArray)?.push(
        new FormControl(question)
      );
    });
    this.Questions = this.getQuestions();
  }

  getQuestions(): FormArray {
    return this.QuizForm.get('questions') as FormArray;
  }

  addNewQuestion() {
    (this.QuizForm.get('questions') as FormArray).push(new FormControl(null));
    this.Questions = this.getQuestions();
    this.valid.set(false);
  }

  editQuiz() {
    if (this.QuizForm.valid) {
      let quiz: Quiz = {
        title: this.QuizForm.get('title')?.value as string,
        courseId: this.QuizData.courseId,
        moduleId: this.QuizData.moduleId,
        questions: (this.QuizForm.get('questions') as FormArray).value,
      };
      this.isloading.set(true);
      this._quizService.editQuiz(this.QuizId, quiz).subscribe((res) => {
        this.isloading.set(false);
        this._Router.navigate(['/editCourse', this.QuizData.courseId]);
      });
    }
  }

  deleteQuestion(index: number) {
    this.Questions.removeAt(index);
  }
  
}

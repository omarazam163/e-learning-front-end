import { Component, inject, signal } from '@angular/core';
import { QuestionFormComponent } from '../question-form/question-form.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../core/services/quiz.service';
import { Quiz } from '../../../shared/interfaces/quiz';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-quiz',
  imports: [ReactiveFormsModule, QuestionFormComponent, CommonModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.scss',
})
export class AddQuizComponent {
  // services
  _activeRouter = inject(ActivatedRoute);
  _quizService = inject(QuizService);

  Questions!: FormArray;
  QuizForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    questions: new FormArray([new FormControl(null)]),
  });

  //varibales
  CourseId!: number;
  ModuleId!: number;
  isloading = signal(false);
  valid = signal(false);
  ngOnInit() {
    this.QuizForm.valueChanges.subscribe((value) => {
      this.valid.set(this.QuizForm.valid);
    });
    this.Questions = this.getQuestions();
    this._activeRouter.queryParams.subscribe((params) => {
      this.CourseId = params['courseId'];
      this.ModuleId = params['moduleId'];
    });
  }

  getQuestions(): FormArray {
    return this.QuizForm.get('questions') as FormArray;
  }

  addNewQuestion() {
    (this.QuizForm.get('questions') as FormArray).push(new FormControl(null));
    this.Questions = this.getQuestions();
    this.valid.set(false);
  }

  addQuiz() {
    if (this.QuizForm.valid) {
      let quiz: Quiz = {
        title: this.QuizForm.get('title')?.value as string,
        courseId: this.CourseId,
        moduleId: this.ModuleId,
        questions: (this.QuizForm.get('questions') as FormArray).value,
      };
      this.isloading.set(true);
      this._quizService.addQuiz(quiz).subscribe((res) => {
        console.log(res);
        this.isloading.set(false);
      });
    }
  }
}

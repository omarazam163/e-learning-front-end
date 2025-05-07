import { Question } from './../../../shared/interfaces/question';
import { Component, Input, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-question-solve-form',
  imports: [FormsModule],
  templateUrl: './question-solve-form.component.html',
  styleUrl: './question-solve-form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: QuestionSolveFormComponent,
      multi: true,
    },
  ],
})
export class QuestionSolveFormComponent implements ControlValueAccessor {
  @Input({ required: true }) Question!: Question;
  @Input({ required: true }) QuestionNumber!: number;
  correctIndex!: number;
  SelectedIndex = signal<number>(-1);
  ngOnInit(): void {
    console.log(this.Question);
    for (let i = 0; i < this.Question.choices.length; i++) {
      if (this.Question.choices[i].isCorrect) {
        this.correctIndex = i;
        break;
      }
    }
  }
  isCorrect = signal<boolean>(false);
  onChange!: (value: boolean) => void;
  onTouch!: () => void;
  writeValue(obj: boolean): void {
    this.isCorrect.set(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onRadioChange() {
    this.onTouch();
    if (this.SelectedIndex() == this.correctIndex) {
      this.isCorrect.set(true);
      this.onChange(this.isCorrect());
    } else {
      this.isCorrect.set(false);
      this.onChange(this.isCorrect());
    }
  }
}

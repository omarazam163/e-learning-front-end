import { Component, Input, Output, output, EventEmitter } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Question } from '../../../shared/interfaces/question';
@Component({
  selector: 'app-question-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: QuestionFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: QuestionFormComponent,
      multi: true,
    },
  ],
})
export class QuestionFormComponent implements ControlValueAccessor, Validator {
  @Input({required:true}) questionNumber!: number;
  @Output() onDeleteQuestion:EventEmitter<void> = new EventEmitter<void>();
  quesForm: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required]),
    choices: new FormArray([
      new FormGroup({
        text: new FormControl('', [Validators.required]),
        isCorrect: new FormControl(true),
      }),
      new FormGroup({
        text: new FormControl('', [Validators.required]),
        isCorrect: new FormControl(false),
      }),
      new FormGroup({
        text: new FormControl('', [Validators.required]),
        isCorrect: new FormControl(false),
      }),
      new FormGroup({
        text: new FormControl('', [Validators.required]),
        isCorrect: new FormControl(false),
      }),
    ]),
  });

  onTouch!: () => void;
  onChange!: (value: Question) => void;
  ngOnInit() {
    this.quesForm?.valueChanges.subscribe((value) => {
      if (this.onTouch == undefined || this.onChange == undefined) return;
      this.onChange(value);
      this.onTouch();
    });
  }

  // interface implementation
  writeValue(obj: Question): void {
    if (obj == null) return;
    this.quesForm.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return this.quesForm.valid ? null : { invalidQuestionForm: true };
  }
  registerOnValidatorChange?(fn: () => void): void {
    // do nothing
  }

  getChoices(): FormArray {
    return this.quesForm.get('choices') as FormArray;
  }

  onCorrectAnswerChange(index: number) {
    (this.quesForm.get('choices') as FormArray).controls.forEach(
      (control, i) => {
        if (i == index) {
          control.get('isCorrect')?.setValue(true);
        } else {
          control.get('isCorrect')?.setValue(false);
        }
      }
    );
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Register } from '../../../shared/interfaces/register';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule , RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm: FormGroup;
  submitted: boolean = false;
  _AuthService = inject(AuthService);
  constructor() {
    this.signUpForm = new FormGroup(
      {
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]),
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl) => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  handleSubmit(): void {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      console.log('Form is invalid!');
    } else {
      let newUser: Register = this.signUpForm.value;
      this._AuthService.register(newUser).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

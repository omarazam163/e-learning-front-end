import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  _auth = inject(AuthService);
  isLoading = signal<boolean>(false);
  _router =inject(Router);
  errorMessage = signal<String>("");
  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl) => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  newPasswordForm: FormGroup = new FormGroup(
    {
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
  submitForm() {
    if (this.newPasswordForm.valid) {
      if (this._auth.emailToResetPassword == '') return;
      const Data: FormData = new FormData();
      Data.append('email', this._auth.emailToResetPassword);
      Data.append('Password', this.newPasswordForm.get('password')?.value);
      Data.append(
        'confirmPassword',
        this.newPasswordForm.get('confirmPassword')?.value
      );
      this.isLoading.set(true);
      this._auth.resetPassword(Data).subscribe({
        next: ()=>{
          this.isLoading.set(false);
          this._router.navigate(["/login"]);
          this._auth.emailToResetPassword="";
        },
        error:(err:any)=>{
          this.errorMessage.set(err.error.message);
          this.isLoading.set(false);
        }
      });
    }
  }
}

import { AuthService } from './../../../core/services/auth.service';
import { Component, ViewChild, inject, signal } from '@angular/core';
import { Console } from 'console';
import {
  NgxOtpInputComponent,
  NgxOtpInputComponentOptions,
  NgxOtpStatus
} from 'ngx-otp-input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-reset-password',
  imports: [NgxOtpInputComponent],
  templateUrl: './confirm-reset-password.component.html',
  styleUrl: './confirm-reset-password.component.scss',
})
export class ConfirmResetPasswordComponent {
  @ViewChild('otpInput') otpInput!: NgxOtpInputComponent;
  otpOptions: NgxOtpInputComponentOptions = {
    otpLength: 6,
    autoFocus: true,
    autoBlur: true,
  };
  _auth = inject(AuthService);
  _router = inject(Router);
  isLoading: boolean = false;
  erroMessage = signal<string>("");
  submit(code: string) {
    if (!this._auth.emailToResetPassword) {
      return;
    }

    this.isLoading = true;

    this._auth.ConfirmResetPassword({email: this._auth.emailToResetPassword, Code: code}).subscribe({
      next: () => {
        this._router.navigate(['/resetPassword']);
        this.isLoading = false;
        this.erroMessage.set("");
      },
      error: (err) => {
        this.isLoading = false;
        this.erroMessage.set(err.error.message);
      },
    });
  }
}

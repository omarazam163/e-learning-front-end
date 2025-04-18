import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl,FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-send-reset-password',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './send-reset-password.component.html',
  styleUrl: './send-reset-password.component.scss',
})
export class SendResetPasswordComponent {
  _auth = inject(AuthService);
  isLoading: boolean = false;
  errorMessage:string = '';
  _router = inject(Router);
  SendResetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  handleSubmit() {
    if(this.SendResetPasswordForm.valid)
    {
      const data:FormData = new FormData();
      data.append('Email', this.SendResetPasswordForm.get('email')?.value as string);
      this.isLoading = true;
      this._auth.SendResetPassword(data).subscribe({
        next: (res:any) => {
          this.isLoading = false;
          this._auth.emailToResetPassword = this.SendResetPasswordForm.get('email')?.value as string;
          this._router.navigate(['/confirmResetPassword']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
        }
      }
      );
    }
  }
}

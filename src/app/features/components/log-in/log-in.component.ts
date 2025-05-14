import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  logInForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  _router = inject(Router);
  _auth = inject(AuthService);
  errorMessage = '';
  constructor() {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.email,Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  handleSubmit(): void {
    this.submitted = true;
    if (this.logInForm.invalid) {
      console.log('Form is invalid!');
    } else {
      this.isLoading = true;
      let data = new FormData();
      data.append('Email', this.logInForm.get('email')?.value);
      data.append('Password', this.logInForm.get('password')?.value);
      this._auth.login(data).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.data.accessToken);
          this._auth.getUserDataFromToken();
          this._auth.islogin.next(this._auth.UserData.getValue().role);
          this._router.navigate(['/home']);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this._auth.islogin.next('noLogin');
          this.errorMessage = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}

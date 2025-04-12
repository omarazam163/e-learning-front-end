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
@Component({
  selector: 'app-log-in',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  logInForm: FormGroup;
  submitted: boolean = false;
  _auth = inject(AuthService);

  constructor() {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  handleSubmit(): void {
    this.submitted = true;
    if (this.logInForm.invalid) {
      console.log('Form is invalid!');
    } else {
      let data = new FormData();
      data.append('Email', this.logInForm.get('email')?.value);
      data.append('Password', this.logInForm.get('password')?.value);
      this._auth.login(data).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.data.accessToken);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

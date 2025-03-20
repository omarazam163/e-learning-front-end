import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ ReactiveFormsModule , CommonModule ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  signUpForm : FormGroup;
  submitted : boolean = false;

  constructor () {
    this.signUpForm = new FormGroup ({
      firstName : new FormControl("" , [ Validators.required , Validators.minLength(3) , Validators.maxLength(15) ]),
      lastName : new FormControl("" , [ Validators.required , Validators.minLength(3) , Validators.maxLength(15) ]),
      email : new FormControl("" , [ Validators.required , Validators.email ]),
      password : new FormControl("" , [ Validators.required , Validators.minLength(8) , Validators.maxLength(15) ]),
      confirmPassword : new FormControl("" , [ Validators.required ])
    },
    {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl) => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  handleSubmit () : void {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      console.log("Form is invalid!");
    }else {
      console.log("Form Submitted Successfully", this.signUpForm.value);
    }

  }

}

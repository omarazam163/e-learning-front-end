import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  imports: [ CommonModule , ReactiveFormsModule ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  logInForm : FormGroup;
  submitted : boolean = false;

  constructor () {
    this.logInForm = new FormGroup ({
      email : new FormControl("" , [ Validators.required , Validators.email ]),
      password : new FormControl("" , [ Validators.required ])
    },
    {
      validators: this.passwordMatchValidator
    }
  );
  }

    passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl) => {
      const password = formGroup.get('password')?.value;
      const passwordOfEmail = '12345678';
      return password === passwordOfEmail ? null : { passwordMismatch: true };
    };

  handleSubmit () : void {
    this.submitted = true;
    if (this.logInForm.invalid) {
      console.log("Form is invalid!");
    }else {
      console.log("Form Submitted Successfully", this.logInForm.value);
    }
  }

}

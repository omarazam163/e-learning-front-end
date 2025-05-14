import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorsService } from '../../../core/services/instructors.service';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Instructor } from '../../../shared/interfaces/Instructor';

@Component({
  selector: 'app-instructor-contact',
  imports: [FormsModule],
  templateUrl: './instructor-contact.component.html',
  styleUrl: './instructor-contact.component.scss',
})
export class InstructorContactComponent {
  instructorId: any;

  instructorData: Instructor = {} as Instructor;

  public email: string = '';
  public emailError: string = '';
  public message: string = '';
  public messageError: string = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    public instructorsService: InstructorsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => (this.instructorId = params.get('id'))
    );
    this.instructorsService
      .getSpecificInstructor(this.instructorId)
      .subscribe((res: Instructor) => {
        this.instructorData = res;
      });
  }

  getInstructorData() {}

  sendEmail() {
    const emailControl = new FormControl(this.email, [Validators.email]);
    if (this.email == '') {
      this.emailError = 'email is required';
    } else if (this.message == '') {
      this.emailError = '';
      this.messageError = 'message is required';
    } else if (emailControl.errors?.['email']) {
      this.messageError = '';
      this.emailError = 'Wrong email';
    } else if (this.message.length < 10) {
      this.emailError = '';
      this.messageError = 'Min length 10';
    } else {
      // Waiting Backend ...
      this.emailError = '';
      this.messageError = '';
      this.email = 'Message Sent';
      this.message = 'Message Sent';
      setTimeout(() => {
        this.email = '';
        this.message = '';
      }, 1000);
    }
  }

}

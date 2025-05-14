import { Student } from './../../../shared/interfaces/student';
import { Component, inject } from '@angular/core';
import { InstructorsService } from '../../../core/services/instructors.service';
import { Instructor } from '../../../shared/interfaces/Instructor';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentService } from '../../../core/services/student.service';
import { role } from '../../../shared/types/role';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent {
  //services
  _instructorService = inject(InstructorsService);
  _studentService = inject(StudentService);
  _PID = inject(PLATFORM_ID);
  _auth = inject(AuthService);
  _router = inject(Router);
  role: role = this._auth.UserData.getValue().role;
  //variables
  userInfo: Instructor | Student = {} as Instructor;
  editForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      bio: new FormControl('', [Validators.required, Validators.minLength(10)]),
      image: new FormControl(''),
    });
  ngOnInit() {

    if (isPlatformBrowser(this._PID)) {
      if (this.role == 'Instructor') {
        this.loadInstructorData();
      } else if (this.role == 'Student') {
        this.loadStudentData();
      }
    }
  }

  intialValues() {
    this.editForm.get('userName')?.setValue(this.userInfo.name);
    if (this.role == 'Instructor') {
      this.editForm.get('bio')?.setValue((this.userInfo as Instructor).bio);
    } else {
      (this.editForm as FormGroup).removeControl('bio');
    }
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userInfo.image = URL.createObjectURL(file);
      this.editForm.patchValue({
        image: file,
      });
    }
  }

  submitFormInstructor() {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('Name', this.editForm.get('userName')?.value as string);
      formData.append('Bio', this.editForm.get('bio')?.value as string);
      formData.append(
        'Image',
        this.editForm.get('image')?.value as unknown as File
      );
      formData.append('Id', this._auth.UserData.getValue().roleId.toString());
      formData.append('Email', this._auth.UserData.getValue().Email as string);
      this._instructorService.updateInstructor(formData).subscribe(() => {
        this._router.navigate(['/home']);
      });
    }
  }

  submitFormStudent() {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('Name', this.editForm.get('userName')?.value as string);
      formData.append(
        'Image',
        this.editForm.get('image')?.value as unknown as File
      );
      formData.append('Email', this._auth.UserData.getValue().Email as string);
      this._studentService
        .updateStudent(this._auth.UserData.getValue().roleId, formData)
        .subscribe(() => {
          this._router.navigate(['/home']);
        });
    }
  }

  loadInstructorData() {
    this._instructorService
      .getSpecificInstructor(this._auth.UserData.getValue().roleId.toString())
      .subscribe({
        next: (res: Instructor) => {
          this.userInfo = res;
          this.intialValues();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  loadStudentData() {
    this._studentService
      .getStudentData(this._auth.UserData.getValue().roleId)
      .subscribe({
        next: (res: Student) => {
          this.userInfo = res;
          this.intialValues();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  removeImage() {
    this.userInfo.image = '';
    this.editForm.get('image')?.setValue('');
  }
}

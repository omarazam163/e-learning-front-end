import { coursePreview } from './../../../shared/interfaces/privewCourse';
import { category } from './../../../shared/interfaces/category';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/interfaces/user.';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { CoursesService } from '../../../core/services/courses.service';
import { Router } from '@angular/router';
import { AddCourseFormComponent } from '../add-course-form/add-course-form.component';
import { PreviewPageComponent } from '../preview-page/preview-page.component';
@Component({
  selector: 'app-add-course',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    PreviewPageComponent,
    AddCourseFormComponent
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
})
export class AddCourseComponent {
  _auth = inject(AuthService);
  _coursesService = inject(CoursesService);
  User: User = {} as User;
  _router = inject(Router);
  isloading = false;
  currentStep = 0;
  coursePreview: coursePreview = {} as coursePreview;
  formData = new FormData();
  ngOnInit() {
    this._auth.UserData.subscribe((user: User) => {
      this.User = user;
    });
  }
  addCourseForm = new FormGroup({
    courseName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    courseDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500),
    ]),
    coursePrice: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/),
    ]),
    courseDuration: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/),
    ]),
    courusecategory: new FormControl('', [Validators.required]),
    courseImage: new FormControl(null, [Validators.required]),
    courseImageUrl: new FormControl('',[Validators.required]),
  });

  handelSubmitCourseData() {

    // for form submit
    if (this.addCourseForm.valid) {
      this.isloading = true;
      this.formData.append(
        'Title',
        this.addCourseForm.get('courseName')?.value as string
      );
      this.formData.append(
        'Description',
        this.addCourseForm.get('courseDescription')?.value as string
      );
      this.formData.append(
        'Price',
        this.addCourseForm.get('coursePrice')?.value as string
      );
      this.formData.append(
        'Hours',
        this.addCourseForm.get('courseDuration')?.value as string
      );
      this.formData.append(
        'CategoryId',
        (this.addCourseForm.get('courusecategory')?.value as string).split(
          '-'
        )[0]
      );
      this.formData.append('InstructorEmail', this.User.Email);
      this.formData.append(
        'Image',
        this.addCourseForm.get('courseImage')?.value as unknown as File
      );


      // for preview
      this.coursePreview = {
        title: this.addCourseForm.get('courseName')?.value as string,
        description: this.addCourseForm.get('courseDescription')
          ?.value as string,
        price: parseInt(this.addCourseForm.get('coursePrice')?.value as string),
        hours: parseInt(
          this.addCourseForm.get('courseDuration')?.value as string
        ),
        category: (
          this.addCourseForm.get('courusecategory')?.value as string
        ).split('-')[1],
        image: this.addCourseForm.get('courseImageUrl')?.value as string,
      };
      console.log(this.coursePreview);
      this.currentStep = 1;
    }
  }

  publish()
  {
    this._coursesService.addNewCourse(this.formData).subscribe({
      next: (res) => {
        this.isloading = false;
        this._router.navigate(['/workSpace']);
      },
    });
  }

  edit()
  {
    this.currentStep = 0;
  }
}

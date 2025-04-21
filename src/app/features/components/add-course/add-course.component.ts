import { category } from './../../../shared/interfaces/category';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/interfaces/user.';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { CoursesService } from '../../../core/services/courses.service';
@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
})
export class AddCourseComponent {
  _auth = inject(AuthService);
  _categoryService = inject(CategoryService);
  _coursesService = inject(CoursesService);
  categories = signal<category[]>([]);
  User: User = {} as User;
  isloading = signal(false);
  ngOnInit() {
    this._auth.UserData.subscribe((user: User) => {
      this.User = user;
    });
    this._categoryService.getCategories().subscribe((res: any) => {
      this.categories.set(res.data);
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
  });

  handelSubmit() {
    console.log(this.addCourseForm.value);
    if (this.addCourseForm.valid) {
      this.isloading.set(true);
      const data = new FormData();
      data.append(
        'Title',
        this.addCourseForm.get('courseName')?.value as string
      );
      data.append(
        'Description',
        this.addCourseForm.get('courseDescription')?.value as string
      );
      data.append(
        'Price',
        this.addCourseForm.get('coursePrice')?.value as string
      );
      data.append(
        'Hours',
        this.addCourseForm.get('courseDuration')?.value as string
      );
      data.append(
        'CategoryId',
        this.addCourseForm.get('courusecategory')?.value as string
      );
      data.append('InstructorId', this.User.Id as string);
      data.append(
        'Image',
        this.addCourseForm.get('courseImage')?.value as unknown as File
      );
      data.append('UpdatedAt', new Date().toISOString());
      console.log(data);
      this._coursesService.addNewCourse(data).subscribe({
        next: (res) => {
          console.log(res);
        },
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Manually set the file in the form control
      this.addCourseForm.patchValue({
        courseImage: file,
      });
    }
  }
}

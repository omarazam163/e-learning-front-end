import { Component, signal } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { role } from '../../../shared/types/role';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from './../../../core/services/category.service';
import { category } from '../../../shared/interfaces/category';
import { Course } from '../../../shared/interfaces/course';

@Component({
  selector: 'app-course',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {
  GetInstuctorImage(arg0: any) {
    throw new Error('Method not implemented.');
  }
  Number(arg0: any) {
    throw new Error('Method not implemented.');
  }
  public inputValue: string = '';
  public categoryActive: number = 0;
  public role: role = 'noLogin';
  categories: category[] = [];
  public courses = signal<Course[]>([]);
  public instructors: any[] = [];

  constructor(
    public coursesService: CoursesService,
    public authServices: AuthService,
    public http: HttpClient,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.authServices.islogin.subscribe((e: role) => (this.role = e));
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
    this.coursesService.getCourses().subscribe((res: Course[]) => {
      this.courses.set(res);
    });
  }

  handleCategoryActive(category: number) {
    this.categoryActive = Number(category);
    if (this.categoryActive == 0) {
      this.coursesService.getCourses().subscribe((res: Course[]) => {
        this.courses.set(res);
      });
    } else {
      this.coursesService
        .getCoursesByCategory(this.categoryActive)
        .subscribe((res: Course[]) => this.courses.set(res));
    }
  }
  handleCategoryActiveSelection(e: any) {
    this.categoryActive = Number((e.target as HTMLSelectElement).value);
    if (this.categoryActive == 0) {
      this.coursesService.getCourses().subscribe((res: Course[]) => {
        this.courses.set(res);
      });
    } else {
      this.coursesService
        .getCoursesByCategory(this.categoryActive)
        .subscribe((res: Course[]) => this.courses.set(res));
    }
  }

  handleSearch() {
    if (this.inputValue == '') {
      this.courses.set(this.courses());
    } else {
      this.courses.set(
        this.courses().filter(
          (c: any) =>
            c.title.toLowerCase().includes(this.inputValue.toLowerCase()) ||
            c.description.toLowerCase().includes(this.inputValue.toLowerCase())
        )
      );
    }
  }
}

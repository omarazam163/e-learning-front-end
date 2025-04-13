import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CoursesService } from '../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-course',
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {
  public allCourses: any;
  public courses: any;
  public endOfCourses: number = 1;
  public inputValue: string = '';
  public category: string = 'all';

  constructor(public coursesService: CoursesService) {}

  ngOnInit(): void {
    this.allCourses = this.coursesService.courses;
    this.courses = this.allCourses.slice(0, 9 * this.endOfCourses - 1);
  }

  handleCategory(category: string) {
    this.category = category;
    if (category == 'all') {
      this.allCourses = this.coursesService.courses;
    } else {
      this.allCourses = this.coursesService.courses.filter(
        (c) => c.category == category
      );
    }
    this.endOfCourses = 1;
    this.courses = this.allCourses.slice(0, 9 * this.endOfCourses - 1);
  }

  handleSearch() {
    this.endOfCourses = 1;
    this.courses = this.coursesService.courses
      .filter(
        (c) =>
          c.title.toLowerCase().includes(this.inputValue.toLowerCase()) ||
          c.category.toLowerCase().includes(this.inputValue.toLowerCase()) ||
          c.admin.toLowerCase().includes(this.inputValue.toLowerCase())
      )
      .slice(0, 9 * this.endOfCourses - 1);
  }

  addNewCourses() {
    if (this.allCourses.length > 9 * this.endOfCourses) {
      this.endOfCourses++;
      this.courses = this.allCourses.slice(0, 9 * this.endOfCourses - 1);
    }
    console.log(this.endOfCourses);
    console.log(this.courses);
  }
}

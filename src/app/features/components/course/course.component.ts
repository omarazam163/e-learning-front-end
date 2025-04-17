import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CoursesService } from '../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { role } from '../../../shared/types/role';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course',
  imports: [CommonModule, RouterModule, FormsModule, RouterLink ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {
  public allCourses: any;
  public endOfCourses: number = 1;
  public inputValue: string = '';
  public category: number = 0;
  public role : role = "noLogin";
  public courseURL = "https://localhost:7180/api/Courses";
  public courses : any[] = [];
  public categoryURL = "https://localhost:7180/api/Categories";
  public categories : any[] = [];
  public coursesForShow: any[] = this.courses;

  constructor(public coursesService: CoursesService , public authServices : AuthService , public http : HttpClient) {}

  ngOnInit(): void {
    this.allCourses = this.coursesService.courses;
    this.courses = this.allCourses.slice(0, 9 * this.endOfCourses - 1);
    this.authServices.islogin.subscribe( (e:role) => this.role=e )
    this.getCourses();
    this.getCategories();
    // console.log(this.courses);
    // console.log(this.categories);
    // this.coursesForShow = this.courses;
  }

  getCourses ()  {
    this.http.get<any>(this.courseURL).subscribe({
      next: (res) => {
        this.courses = res.data;
        this.coursesForShow = this.courses;
        // console.log(this.courses);
      },
      error: (err) => console.log(err)
    })
  }
  getCategories() {
    this.http.get<any>(this.categoryURL).subscribe({
      next : (res) => {
        this.categories = res.data;
        this.categories.unshift({categoryId: 0, categoryName: 'All'})
      },
      error: (err) => console.log(err)
    });
  }

  handleCategory(category: number) {
    this.category = category;
    if (category == 0) {
      this.http.get<any>(this.courseURL).subscribe((res) => this.coursesForShow = res.data);
    }else {
      this.http.get<any>(`https://localhost:7180/api/Courses/${category}`).subscribe((res) => this.coursesForShow = res.data);
    }
  }

  handleSearch() {
    this.endOfCourses = 1;
    this.coursesForShow = this.coursesForShow.filter( (c) =>
          c.title.toLowerCase().includes(this.inputValue.toLowerCase()) ||
          c.description.toLowerCase().includes(this.inputValue.toLowerCase()) 
          // c.instructor.toLowerCase().includes(this.inputValue.toLowerCase())
      ).slice(0, 9 * this.endOfCourses - 1);
  }

  addNewCourses() {
    if (this.coursesForShow.length > 9 * this.endOfCourses) {
      this.endOfCourses++;
      this.coursesForShow = this.coursesForShow.slice(0, 9 * this.endOfCourses - 1);
    }
  }
}

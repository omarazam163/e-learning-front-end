import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CoursesService } from '../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { role } from '../../../shared/types/role';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from './../../../core/services/category.service';
import { InstructorsService } from './../../../core/services/instructors.service';
import { category } from '../../../shared/interfaces/category';
import { Course } from '../../../shared/interfaces/course';


@Component({
  selector: 'app-course',
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
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
  public courseURL = 'https://localhost:7180/api/Courses';
  categories: category[]= [];
  public courses : Course[] = [];
  public coursesForShow: any[] = [];
  public instructors : any[] = [];

  constructor(
    public coursesService: CoursesService,
    public authServices: AuthService,
    public http: HttpClient,
    public categoryService: CategoryService,
    public instructorsService: InstructorsService
  ) {
    this.coursesForShow = this.courses;
  }

  ngOnInit(): void {
    this.authServices.islogin.subscribe((e: role) => (this.role = e));
    this.categoryService.getAllCategories().subscribe( (res:any) =>
      {
        this.categories = res.data; 
        console.log(this.categories);
      });
    this.coursesService.getCourses().subscribe( (res) => {
      this.courses = res;
      this.coursesForShow = res;
    } )
    this.instructorsService.getInstructors().subscribe( (res) => this.instructors = res )
  }

  handleCategoryActive(category: number) {
    this.categoryActive = Number(category);
    if (this.categoryActive == 0) {
      this.coursesForShow = this.courses;
    } else {
      this.http
        .get<any>(`https://localhost:7180/api/Courses/Category/${this.categoryActive}`)
        .subscribe((res) => (this.coursesForShow = res.data));
    }
  }
  handleCategoryActiveSelection(e : any){
    this.categoryActive = Number((e.target as HTMLSelectElement).value);
    if (this.categoryActive == 0) {
      this.coursesForShow = this.courses;
    } else {
      this.http
        .get<any>(`https://localhost:7180/api/Courses/Category/${this.categoryActive}`)
        .subscribe((res) => (this.coursesForShow = res.data));
    }
  }

  handleSearch() {
    if (this.inputValue == '') {
      this.coursesForShow = this.courses;
    }else {
      this.coursesForShow = this.coursesForShow.filter( (c) =>
        c.title.toLowerCase().includes(this.inputValue.toLowerCase()) ||
        c.description.toLowerCase().includes(this.inputValue.toLowerCase())
      )
    }
  }

  getInstructorData(iId : any){
    return this.instructors.find( i => i.id == iId)
  }

}

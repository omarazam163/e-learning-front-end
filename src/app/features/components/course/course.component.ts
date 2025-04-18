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


@Component({
  selector: 'app-course',
  imports: [CommonModule, RouterModule, FormsModule, RouterLink ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {
  public inputValue: string = '';
  public categoryActive: number = 0;
  public role : role = "noLogin";
  public courseURL = "https://localhost:7180/api/Courses";

  public coursesForShow: any[] = [];

  constructor(public coursesService: CoursesService , public authServices : AuthService , public http : HttpClient , public categoryService : CategoryService) {
    this.coursesForShow = coursesService.courses;
  }

  ngOnInit(): void {
    this.authServices.islogin.subscribe( (e:role) => this.role=e )
  }

  

  handleCategoryActive(category: number) {
    this.categoryActive = category;
    if (category == 0) {
      this.coursesForShow = this.coursesService.courses;
    }else {
      this.http.get<any>(`https://localhost:7180/api/Courses/${category}`).subscribe((res) => this.coursesForShow = res.data);
    }
  }

  handleSearch() {
    if (this.inputValue == "") {
      this.coursesForShow = this.coursesService.courses;
    }else {
      this.coursesForShow = this.coursesForShow.filter( (c) =>
        c.title.toLowerCase().includes(this.inputValue.toLowerCase()) ||
        c.description.toLowerCase().includes(this.inputValue.toLowerCase())
      )
    }
  }

}

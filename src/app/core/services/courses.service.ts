import { Injectable } from '@angular/core';
import { Course } from '../../shared/interfaces/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  public courseURL = "https://localhost:7180/api/Courses";
  public courses : any[] = [];
  public categoryURL = "https://localhost:7180/api/Categories";
  public categories : any[] = [];

  constructor( public http : HttpClient ) {}

  ngOnInit(): void {
    this.getCourses();
    this.getCategories();
  }

  getCourses ()  {
    this.http.get<any>(this.courseURL).subscribe({
      next: (res) => {
        this.courses = res.data;
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

}

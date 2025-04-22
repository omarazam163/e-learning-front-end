import { Injectable } from '@angular/core';
import { Course } from '../../shared/interfaces/course';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  public courseURL = "https://localhost:7180/api/Courses";

  constructor( public http : HttpClient ) {}

    getCourses() : Observable<any[]>{
      return this.http.get<any>(this.courseURL).pipe(
        map(res => {
          return res.data;
        })
      );
    }

    addNewCourse(data:FormData)
    {
      return this.http.post(this.courseURL,data);
    }
}

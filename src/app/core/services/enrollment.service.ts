import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Course } from '../../shared/interfaces/course';
import { CoursesService } from './courses.service';
@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  _http = inject(HttpClient);
  _CourseService = inject(CoursesService);
  constructor() {}
  Url = 'https://localhost:7180/api/Enrollment/Student';


  checkInrollment(studentId: number, CourseId: number): Observable<any> {
  const headers = new HttpHeaders().set(
    'Content-Type',
    'text/plain; charset=utf-8'
  );

    return this._http
      .get(`${this.Url}/${studentId}/Course/${CourseId}`, {
        headers,
        responseType: 'text' as 'json',
      });
  }

  getAllEnrollmentForStudent(studentId: number): Observable<Course[]> {
    return this._http.get<{data:Course[]}>(`${this.Url}/${studentId}`).pipe(
      switchMap((res:any)=>
      {
        let data:number[] = res.map((course:any) => course.courseId);
        let final = data.map((courseId: number) =>
          this._CourseService.getCourseById(courseId)
        );
        return forkJoin(final);
      }
      )
    );
  }
}

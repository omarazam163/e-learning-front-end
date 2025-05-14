import { Course } from './../../shared/interfaces/course';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  forkJoin,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { InstructorsService } from './instructors.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courseURL = 'https://localhost:7180/api/Courses';
  _instructorService = inject(InstructorsService);

  constructor(public http: HttpClient) {}

  getCourses() {
        return this.http
          .get<{ data: Course[] }>(this.courseURL)
          .pipe(
            switchMap((res) => {
              const courses = res.data;
              const enrichedCourses$ = courses.map((course: any) =>
                this._instructorService
                  .getSpecificInstructor(course.instructorId)
                  .pipe(
                    map((instructor: any) => ({
                      ...course,
                      instructor: instructor,
                    }))
                  )
              );

              return forkJoin(enrichedCourses$);
            })
          );
  }

  addNewCourse(data: FormData) {
    return this.http.post(this.courseURL, data);
  }

  getInstructorCourses(instructorId: string): Observable<Course[]> {
        return this.http
          .get<{ data: Course[] }>(this.courseURL + "/Instructor/" + instructorId)
          .pipe(
            switchMap((res) => {
              const courses = res.data;
              const enrichedCourses$ = courses.map((course: any) =>
                this._instructorService
                  .getSpecificInstructor(course.instructorId)
                  .pipe(
                    map((instructor: any) => ({
                      ...course,
                      instructor: instructor,
                    }))
                  )
              );

              return forkJoin(enrichedCourses$);
            })
          );
  }

  getCoursesByCategory(categoryId: number): Observable<Course[]> {
    return this.http
      .get<{ data: Course[] }>(this.courseURL + '/Category/' + categoryId)
      .pipe(
        switchMap((res) => {
          const courses = res.data;
          const enrichedCourses$ = courses.map((course: any) =>
            this._instructorService
              .getSpecificInstructor(course.instructorId)
              .pipe(
                map((instructor: any) => ({
                  ...course,
                  instructor: instructor,
                }))
              )
          );

          return forkJoin(enrichedCourses$);
        })
      );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<any>(this.courseURL + '/' + id).pipe(switchMap((res:any)=>{
      const Data = res.data;
      const course = this._instructorService.getSpecificInstructor(Data.instructorId).pipe(
        map((instructor: any) => ({
          ...Data,
          instructor: instructor,
        }))
      )
      return course;
    }));
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(this.courseURL + '/' + id);
  }

}

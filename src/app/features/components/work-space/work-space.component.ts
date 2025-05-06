import { CoursesService } from './../../../core/services/courses.service';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Course } from '../../../shared/interfaces/course';

@Component({
  selector: 'app-work-space',
  imports: [RouterLink],
  templateUrl: './work-space.component.html',
  styleUrl: './work-space.component.scss',
})
export class WorkSpaceComponent {
  _auth = inject(AuthService);
  _CoursesService = inject(CoursesService);
  Courses = signal<Course[]>([]);
  Id: string = '0';
  Name: string = '';
  ngOnInit() {
    if (this._auth.islogin.getValue() == 'Instructor') {
      this.Id = this._auth.UserData.getValue().roleId || '0';
      this.Name = this._auth.UserData.getValue().UserName;
      this._CoursesService
        .getInstructorCourses(this.Id.toString())
        .subscribe((res: Course[]) => {
          this.Courses.set(res);
        });
    }
  }

  deleteCourse(id: number) {
    this._CoursesService.deleteCourse(id).subscribe((res) => {
      this.Courses.set(this.Courses().filter((course) => course.id != id));
    });
  }
}

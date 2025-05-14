import { Component, inject, signal } from '@angular/core';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { AuthService } from '../../../core/services/auth.service';
import { Course } from '../../../shared/interfaces/course';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-my-courses',
  imports: [RouterLink],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
})
export class MyCoursesComponent {
  _EnrollmentService = inject(EnrollmentService);
  _AuthService = inject(AuthService);

  Courses = signal<Course[]>([]);
  ngOnInit() {
    this._EnrollmentService
      .getAllEnrollmentForStudent(this._AuthService.UserData.getValue().roleId)
      .subscribe((res) => this.Courses.set(res));
  }
}

import { CoursesService } from './../../../core/services/courses.service';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-work-space',
  imports: [RouterLink],
  templateUrl: './work-space.component.html',
  styleUrl: './work-space.component.scss',
})
export class WorkSpaceComponent {
  _auth = inject(AuthService);
  _CoursesService = inject(CoursesService);
  ngOnInit()
  {
    this._CoursesService.getInstructorCourses(this._auth.UserData.getValue().instructorId as string).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
        }
      }
    );
  }
}

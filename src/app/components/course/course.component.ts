import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CoursesService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [CommonModule , RouterModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {

  constructor ( public coursesService : CoursesService ) {}

}

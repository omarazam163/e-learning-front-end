import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { InstructorsService } from '../../../core/services/instructors.service';

@Component({
  selector: 'app-instructor-courses',
  imports: [CommonModule , RouterModule],
  templateUrl: './instructor-courses.component.html',
  styleUrl: './instructor-courses.component.scss'
})
export class InstructorCoursesComponent {

  instructorId : any;
  instructorCourses : any[] = [];

  constructor ( public activatedRoute : ActivatedRoute , public coursesService : CoursesService , public instructorsService : InstructorsService ) {}

  ngOnInit(): void {
    this.instructorId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getInstructorCourses();
  }

  getInstructorCourses(){
    this.coursesService.getCourses().subscribe( (res) =>{
      this.instructorCourses = res.filter( (c) => c.instructorId == this.instructorId );
    })
    // this.coursesService.courses.filter( c => c.instructorId = this.instructorId );
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { InstructorsService } from '../../../core/services/instructors.service';
import { Course } from '../../../shared/interfaces/course';
import { Instructor } from '../../../shared/interfaces/Instructor';

@Component({
  selector: 'app-instructor-courses',
  imports: [CommonModule , RouterModule],
  templateUrl: './instructor-courses.component.html',
  styleUrl: './instructor-courses.component.scss'
})
export class InstructorCoursesComponent {

  instructorId : any;
  instructorCourses : Course[] = [];
  instructors : Instructor[] = [];
  instructorData : any;

  constructor ( public activatedRoute : ActivatedRoute , public coursesService : CoursesService , public instructorsService : InstructorsService ) {}

  ngOnInit(): void {
    this.instructorId = this.activatedRoute.snapshot.paramMap.get('id');
    this.instructorsService.getInstructors().subscribe( (res:any) => {
      this.instructors = res.data
      this.getInstructorData();
      this.getInstructorCourses();
    } )
  }

  getInstructorCourses(){
    this.coursesService.getInstructorCourses(this.instructorId).subscribe( (res:any) => this.instructorCourses = res.data )
  }
  getInstructorData () {
    this.instructorsService.getSpecificInstructor(this.instructorId).subscribe( (res:any) => this.instructorData = res.data )
  }

}

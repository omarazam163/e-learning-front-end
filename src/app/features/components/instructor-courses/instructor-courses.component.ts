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
  instructors : any[] = [];
  instructorData : any;

  constructor ( public activatedRoute : ActivatedRoute , public coursesService : CoursesService , public instructorsService : InstructorsService ) {}

  ngOnInit(): void {
    this.instructorId = this.activatedRoute.snapshot.paramMap.get('id');
    this.instructorsService.getInstructors().subscribe( (res) => {
      this.instructors = res
      this.getInstructorData();
      this.getInstructorCourses();
    } )
  }

  getInstructorCourses(){
    this.coursesService.getCourses().subscribe( (res) =>{
      this.instructorCourses = res.filter( (c) => c.instructorId == this.instructorId );
    })
  }
  getInstructorData () {
    this.instructorData = this.instructors.find( i => i.id == this.instructorId )
  }

}

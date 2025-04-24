import { Component } from '@angular/core';
import { InstructorsService } from '../../../core/services/instructors.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Instructor } from '../../../shared/interfaces/Instructor';

@Component({
  selector: 'app-instructor',
  imports: [CommonModule,RouterModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss'
})
export class InstructorComponent {

  instructors : Instructor[] = []; 

  constructor ( public instructorsService : InstructorsService ) {}

  ngOnInit(): void {
    this.instructorsService.getInstructors().subscribe( (res:any) => this.instructors = res )
  }

}

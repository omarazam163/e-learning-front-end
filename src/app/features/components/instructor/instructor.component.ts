import { Component } from '@angular/core';
import { InstructorsService } from '../../../core/services/instructors.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-instructor',
  imports: [CommonModule,RouterModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss'
})
export class InstructorComponent {

  instructors : any[] = []; 

  constructor ( public instructorsService : InstructorsService ) {}

  ngOnInit(): void {
    this.instructorsService.getInstructors().subscribe( (res) => this.instructors = res )
  }

}

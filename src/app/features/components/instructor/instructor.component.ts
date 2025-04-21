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

  constructor ( public instructorsService : InstructorsService ) {}

}

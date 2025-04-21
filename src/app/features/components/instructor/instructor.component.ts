import { Component } from '@angular/core';
import { InstructorsService } from '../../../core/services/instructors.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructor',
  imports: [CommonModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss'
})
export class InstructorComponent {

  constructor ( public instructorsService : InstructorsService ) {}

}

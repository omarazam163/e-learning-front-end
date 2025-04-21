import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorsService } from '../../../core/services/instructors.service';

@Component({
  selector: 'app-instructor-contact',
  imports: [],
  templateUrl: './instructor-contact.component.html',
  styleUrl: './instructor-contact.component.scss'
})
export class InstructorContactComponent {

  instructorId :any;
  instructorEmail :any;

  constructor ( public activatedRoute : ActivatedRoute , public instructorsService : InstructorsService ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.instructorId = params.get('id');  
    });
    // this.instructorId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getInstructorEmail();
  }

  getInstructorEmail() {
    console.log(this.instructorId);
    console.log(this.instructorsService.instructors[this.instructorId]);
  }

}

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
  instructors : any[] = [];
  instructorData : any;

  constructor ( public activatedRoute : ActivatedRoute , public instructorsService : InstructorsService ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.instructorId = params.get('id'));
    this.instructorsService.getInstructors().subscribe( (res) => {
      this.instructors = res
      this.getInstructorData();
    })
  }

  getInstructorData() {
    this.instructorData = this.instructors.find( i => i.id = this.instructorId )
  }

}

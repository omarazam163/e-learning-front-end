import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  instructorsURL = "https://localhost:7180/api/Instructors";

  constructor( public http : HttpClient ) {  }

  getInstructors() {
    return this.http.get(this.instructorsURL);
  }

  getSpecificInstructor(InstructorId: string) {
    return this.http.get(this.instructorsURL+"/"+InstructorId);
  }

}

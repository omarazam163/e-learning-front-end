import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Instructor } from '../../shared/interfaces/Instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  instructorsURL = "https://localhost:7180/api/Instructors";

  constructor( public http : HttpClient ) {  }

  getInstructors():Observable<Instructor[]> {
    return this.http.get(this.instructorsURL).pipe(
      map((res: any) => res.data)
    );
  }

  getSpecificInstructor(InstructorId: string) {
    return this.http.get(this.instructorsURL+"/"+InstructorId);
  }

}

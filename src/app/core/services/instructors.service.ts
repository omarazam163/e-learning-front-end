import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  instructorsURL = "https://localhost:7180/api/Instructors";

  constructor( public http : HttpClient ) {  }

  getInstructors() : Observable<any[]>{
    return this.http.get<any>(this.instructorsURL).pipe(
      map(res => {
        return res.data;
      })
    );
  }

}

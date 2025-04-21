import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  instructorsURL = "https://localhost:7180/api/Instructors";
  instructors : any[] = []; 

  constructor( public http : HttpClient ) {
    this.getInstructors().subscribe( (res) => this.instructors = res )
  }

  getInstructors() : Observable<any[]>{
    return this.http.get<any>(this.instructorsURL).pipe(
      map(res => {
        return res.data;
      })
    );
  }

}

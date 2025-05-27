import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../shared/interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor() {}
  _http = inject(HttpClient);
  Url = 'https://localhost:7180/api/Students';

  getStudentData(studentId: number): Observable<Student> {
    return this._http.get<Student>(`${this.Url}/${studentId}`);
  }

  updateStudent(studentId: number, student: FormData): Observable<any> {
    return this._http.put(`${this.Url}/${studentId}`, student, {
      responseType: 'text',
    });
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../../shared/interfaces/quiz';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }
  QuizUrl:string ='https://localhost:7180/api/Quiz';
  _http = inject(HttpClient);
  addQuiz(newQuiz:Quiz):Observable<any>
  {
    return this._http.post(this.QuizUrl,newQuiz);
  }
}

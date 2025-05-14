import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Quiz } from '../../shared/interfaces/quiz';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}
  QuizUrl: string = 'https://localhost:7180/api/Quiz';
  _http = inject(HttpClient);
  addQuiz(newQuiz: Quiz): Observable<any> {
    return this._http.post(this.QuizUrl, newQuiz);
  }

  deleteQuiz(quizId: number): Observable<any> {
    return this._http.delete(`${this.QuizUrl}/${quizId}`);
  }

  getQuizWithId(quizId: number): Observable<Quiz> {
    return this._http.get<Quiz>(`${this.QuizUrl}/${quizId}`);
  }

  editQuiz(quizId:number,newQuiz: Quiz): Observable<any> {
    return this._http.put(`${this.QuizUrl}/${quizId}`, newQuiz);
  }

  submitQuiz(quizId:number,studentId:number,score:number): Observable<any> {
    const data = {
      quizId:quizId,
      studentId:studentId,
      score:score
    }
    console.log(data);
    const params = new HttpParams({ fromObject:data  });
    return this._http.patch(
      `${this.QuizUrl}/submit-score`,
      {},
      { params: params }
    );
  }

}

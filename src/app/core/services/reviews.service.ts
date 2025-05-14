import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Review } from '../../shared/interfaces/review';
import { ReviewPost } from '../../shared/interfaces/reviewPost';
@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }

  _http = inject(HttpClient);

  getreviewsByCourseId(courseId: number): Observable<Review[]> {
    return this._http.get(`https://localhost:7180/api/Reviews/Course/${courseId}`).pipe(
      map((res: any) => res.data)
    );
  }

  postReview(data:ReviewPost)
  {
    return this._http.post(`https://localhost:7180/api/Reviews`,data);
  }
}

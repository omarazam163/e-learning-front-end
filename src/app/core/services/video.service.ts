import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class VideoService {
  _http = inject(HttpClient);
  constructor() {}
  public moduleURL = 'https://localhost:7180/api/Modules';
  addVideotoModule(data: FormData): Observable<any> {
    return this._http
      .post(this.moduleURL + '/Video', data)
      .pipe(timeout(60 * 10 * 60 * 1000));
  }

  // removeVideoFromModule(videoId: number): Observable<any> {
  //   return this._htttp.delete(this.moduleURL + '/Video',
  //     {
  //       id: videoId
  //     }
  //   );
  // }

  markVideoAsDone(studentId: number, videoId: number): Observable<any> {
    let data = { studentId: studentId, videoId: videoId };
    const params = new HttpParams({ fromObject: data });
    return this._http.patch(
      `${this.moduleURL}/video/watch`,
      {},
      { params: params }
    );
  }

  
}

import { inject, Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, timeout } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class VideoService {
  _htttp = inject(HttpClient);
  constructor() {}
  public moduleURL = 'https://localhost:7180/api/Modules';
  addVideotoModule(data: FormData): Observable<any> {
    return this._htttp
      .post(this.moduleURL + '/Video', data, {
        reportProgress: true,
        observe: 'events' as const,
      })
      .pipe(timeout(600000));
  }

  // removeVideoFromModule(videoId: number): Observable<any> {
  //   return this._htttp.delete(this.moduleURL + '/Video',
  //     {
  //       id: videoId
  //     }
  //   );
  // }
}

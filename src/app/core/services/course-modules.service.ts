import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Module } from '../../shared/interfaces/module';
@Injectable({
  providedIn: 'root',
})
export class CourseModulesService {
  _http = inject(HttpClient);
  public moduleURL = 'https://localhost:7180/api/Modules';

  getCourseModules(id: number): Observable<Module[]> {
    return this._http
      .get(this.moduleURL + '/Course/' + id)
      .pipe(map((res: any) => res.data));
  }

  addModuleToCourse(CourseId: number, moduleName: string): Observable<any> {
    return this._http.post(this.moduleURL, {
      title: moduleName,
      courseId: CourseId,
    });
  }

  deleteVideoFromModule(videoId: number): Observable<any> {
    return this._http.delete(this.moduleURL + '/Video/' + videoId);
  }

  deleteModule(moduleId: number): Observable<any> {
    return this._http.delete(this.moduleURL + '/' + moduleId);
  }
}

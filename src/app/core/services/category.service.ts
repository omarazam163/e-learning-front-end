import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categoryURL = "https://localhost:7180/api/Categories";

  constructor ( public http : HttpClient ) {}

  getCategories() : Observable<any[]>{
    return this.http.get<any>(this.categoryURL).pipe(
      map(res => {
        res.data.unshift({categoryId: 0, categoryName: 'All'});
        return res.data;
      })
    );
  }


}

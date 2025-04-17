import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categoryURL = "https://localhost:7180/api/Categories";
  public categories : any[] = [];

  
  constructor( public http : HttpClient ) {
    this.getCategories().subscribe( (res) => this.categories = res )
  }

  getCategories() : Observable<any[]>{
    return this.http.get<any>(this.categoryURL).pipe(
      map(res => {
        const categories = res.data;
        categories.unshift({ categoryId: 0, categoryName: 'All' });
        return categories;
      })
    );
  }

}

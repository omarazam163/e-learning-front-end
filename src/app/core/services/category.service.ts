import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categoryURL = "https://localhost:7180/api/Categories";

  constructor ( public http : HttpClient ) {}
  
  getAllCategories(){
    return this.http.get(this.categoryURL);
  }



}

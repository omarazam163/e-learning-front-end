import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUrl: string = 'https://localhost:7180/api/Cart';
  _http = inject(HttpClient);
  constructor() {}

  // getCart(userId:number): Observable<Course>
  // {
  //   return thi
  // }
}

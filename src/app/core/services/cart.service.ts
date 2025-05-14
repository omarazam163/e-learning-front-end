import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { Course } from '../../shared/interfaces/course';
import { switchMap } from 'rxjs/operators';
import { CoursesService } from './courses.service';
import { Cart } from '../../shared/interfaces/Cart';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUrl: string = 'https://localhost:7180/api/Cart';
  _http = inject(HttpClient);
  _CourseService = inject(CoursesService);
  _authService = inject(AuthService);
  _cartItems = new BehaviorSubject<Course[]>([]);
  cart: Cart = { CartId: '', courses: [] };
  constructor() {
    this._authService.islogin.subscribe((val) => {
    if(val!=="Student") return;
      this._authService.UserData.subscribe((user) => {
        if (user.roleId) {
          this.getCart(user.roleId).subscribe((res: Cart) => {
            this.cart = res;
            this._cartItems.next(res.courses);
          });
        }
      });
    });
  }

  getCart(userId: number): Observable<Cart> {
    return this._http.get<{ Cart: Cart }>(this.cartUrl + '/' + userId).pipe(
      switchMap((res: any) => {
        const CartId: string = res.cartId;
        const CourseIds = res.courses.map((course: any) => course.courseId);
        const Courses: Observable<Course>[] = CourseIds.map(
          (courseId: number) => this._CourseService.getCourseById(courseId)
        );
        return forkJoin(Courses).pipe(
          switchMap((resolvedCourses: Course[]) =>
            of({ CartId: CartId, courses: resolvedCourses })
          )
        );
      })
    );
  }

  addToCart(studentId: number, courseId: number): Observable<Cart> {
    return this._http.post<Cart>(this.cartUrl + '/add/' + courseId, {
      studentId: studentId,
    });
  }

  removeFromCart(studentId: number, courseId: number): Observable<any> {
    return this._http.delete(
      this.cartUrl + '/' + studentId + '/remove/' + courseId
    );
  }

  checkOut(studentId: number) {
    return this._http.post(this.cartUrl + '/checkout/' + studentId, {});
  }
}

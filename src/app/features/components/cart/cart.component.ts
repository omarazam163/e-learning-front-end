import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Course } from '../../../shared/interfaces/course';
import { Cart } from '../../../shared/interfaces/Cart';
@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  _CartService = inject(CartService);
  _authService = inject(AuthService);
  StudentId!:number;
  totalPrice = signal<number>(0);
  Courses = signal<Course[]>([]);
  cartId = signal<string>('');
  ngOnInit() {
    this.StudentId = this._authService.UserData.getValue().roleId;
    this._CartService.getCart(this.StudentId).subscribe((res:Cart) => {
      this.Courses.set(res.courses);
      this.cartId.set(res.CartId);
      this._CartService._cartItems.next(res.courses);
      this.calcTotalPrice();
    });
  }

  calcTotalPrice(): void {
    let total = 0;
    this.Courses().forEach((course) => {
      total += course.price;
    });
    this.totalPrice.set(total);
  }

  removeFromCart(CourseId:number)
  {
    this._CartService
      .removeFromCart(this.StudentId, CourseId)
      .subscribe(() => {
        this.Courses.update((prevCourses) => {
          return prevCourses.filter((course) => course.id !== CourseId);
        });
        this._CartService._cartItems.next(this.Courses());
        this._CartService._cartItems.next(this.Courses());
        this.calcTotalPrice();
      });
  }

  checkOut() {
    this._CartService.checkOut(this.StudentId).subscribe((res:any) => {
      window.open(res.url, '_blank');
    });
  }
}

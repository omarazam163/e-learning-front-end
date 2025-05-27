import { Instructor } from './../../../shared/interfaces/Instructor';
import { AuthService } from '../../../core/services/auth.service';
import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../shared/interfaces/user.';
import { CartService } from '../../../core/services/cart.service';
import { StudentService } from '../../../core/services/student.service';
import { InstructorsService } from '../../../core/services/instructors.service';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('mobileMenu') menu!: ElementRef;
  @ViewChild('dropdownMenu') dropdown!: ElementRef;
  @ViewChild('dropdownMenuMobile') dropdownMobile!: ElementRef;
  _auth = inject(AuthService);
  _CartService = inject(CartService);
  _StudentService = inject(StudentService);
  _InstructorService = inject(InstructorsService);
  isLoggedIn = false;
  User: User = {} as User;
  Image:string = '';
  cartitemsNumber = signal<number>(0);
  _cart = inject(CartService);
  openMenu() {
    (this.menu.nativeElement as HTMLElement).classList.toggle('hidden');
  }

  ngOnInit() {
    this._auth.islogin.subscribe((val) => {
      if (val == 'Student' || val == 'Instructor') {
        this.isLoggedIn = true;
        this._auth.UserData.subscribe((user: User) => {
          this.User = user;
          if (user.role == 'Student') this.getStudentData();
          if (user.role == 'Instructor') this.getInstructorData();
        });
      } else this.isLoggedIn = false;
    });

    this._CartService._cartItems.subscribe((items) => {
      this.cartitemsNumber.set(items.length);
    })
  }

  getStudentData()
  {
    this._StudentService
    .getStudentData(this._auth.UserData.getValue().roleId)
    .subscribe((res) => {
      if (res.image != null) this.Image = res.image;
      else this.Image = '';
    })
  }

  getInstructorData()
  {
    this._InstructorService
    .getSpecificInstructor(this._auth.UserData.getValue().roleId.toString())
    .subscribe((res) => {
      if(res.image != null) this.Image = res.image
      else this.Image = "";
    })
  }

  signOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this._auth.UserData.next({} as User);
    this._auth.islogin.next('noLogin');
    this._cart._cartItems.next([]);
  }

  toggleDropdown() {
    (this.dropdown.nativeElement as HTMLElement).classList.toggle('hidden');
  }
  toggleDropdownMobile() {
    (this.dropdownMobile.nativeElement as HTMLElement).classList.toggle(
      'hidden'
    );
  }
}

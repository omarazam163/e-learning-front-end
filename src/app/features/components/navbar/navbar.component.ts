import { AuthService } from '../../../core/services/auth.service';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../shared/interfaces/user.';
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
  isLoggedIn = false;
  User: User = {} as User;

  openMenu() {
    (this.menu.nativeElement as HTMLElement).classList.toggle('hidden');
  }

  ngOnInit() {
    this._auth.islogin.subscribe((val) => {
      if (val == 'Student' || val == 'Instructor') {
        this.isLoggedIn = true;
        this._auth.UserData.subscribe((user: User) => {
          this.User = user;
          // console.log(this.User, 'user from navbar component');
        });
      } else this.isLoggedIn = false;
    });
  }

  signOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this._auth.UserData.next({} as User);
    this._auth.islogin.next('noLogin');
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

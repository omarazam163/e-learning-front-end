import { AuthService } from '../../../core/services/auth.service';
import { Component, ElementRef, Input, ViewChild, inject, viewChild } from '@angular/core';
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
  @ViewChild('searchBar') searchBar!: ElementRef;
  @ViewChild('mobileMenu') menu!: ElementRef;
  @ViewChild('dropdownMenu') dropdown!: ElementRef;
  @ViewChild('dropdownMenuMobile') dropdownMobile!: ElementRef;
  _auth = inject(AuthService);
  isLoggedIn = false;
  User: User = {} as User;
  openSearchBar() {
    (this.searchBar.nativeElement as HTMLElement).classList.toggle('hidden');
    (this.menu.nativeElement as HTMLElement).classList.add('hidden');
  }

  openMenu() {
    (this.menu.nativeElement as HTMLElement).classList.toggle('hidden');
    (this.searchBar.nativeElement as HTMLElement).classList.add('hidden');
  }

  ngOnInit() {
    this._auth.islogin.subscribe((val) => {
      if (val == 'student' || val == 'teacher') {
        this.isLoggedIn = true;
        this._auth.UserData.subscribe((user: User) => {
          this.User = user;
        });
      } else this.isLoggedIn = false;
    });
  }

  signOut() {
    console.log('sign out');
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

import { User } from './../../shared/interfaces/user.';
import { role } from './../../shared/types/role';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../../shared/interfaces/register';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Console } from 'console';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'https://localhost:7180/api';
  _PLATFORM_ID = inject(PLATFORM_ID);
  emailToResetPassword: string = '';
  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('token')) {
        this.getUserDataFromToken();
        this.islogin.next(this.UserData.getValue().role);
      } else {
        this.islogin.next('noLogin');
        this.UserData.next({} as User);
      }
    }
  }
  _http = inject(HttpClient);
  islogin = new BehaviorSubject<role>('noLogin');
  UserData = new BehaviorSubject<User>({} as User);
  register(newUser: Register) {
    return this._http.post(this.url + '/Auth/Register', newUser);
  }

  login(user: FormData) {
    return this._http.post(this.url + '/Auth/Login', user);
  }

  getUserDataFromToken() {
    let decoded = jwtDecode(localStorage.getItem('token')!);
    let role = (decoded as any)[
      `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
    ];
    const { Email, UserName, Id, studentId, instructorId } = decoded as any;
    this.UserData.next({
      Email,
      UserName,
      Id,
      role,
      roleId: studentId || instructorId,
    });
  }
  SendResetPassword(data: FormData) {
    return this._http.post(this.url + '/Auth/SendResetPassword', data);
  }

  ConfirmResetPassword(data: any) {
    return this._http.post(this.url + '/Auth/ConfirmResetPassword', data);
  }

  resetPassword(data: FormData) {
    return this._http.post(this.url + '/Auth/ResetPassword', data);
  }
}

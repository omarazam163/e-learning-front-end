import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../../shared/interfaces/register';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'https://localhost:7180/api';
  constructor() {}
  _http = inject(HttpClient);
  islogin = new BehaviorSubject<boolean>(false);
  register(newUser: Register) {
    return this._http.post(this.url + '/Auth/Register', newUser);
  }

  login(user: FormData) {
    return this._http.post(this.url + '/Auth/Login', user);
  }

  // /*----------------------------*/
  // // is student or instructor or general
  // // كود تجريبي

  private role: 'student' | 'instructor' | 'general' = 'student';
  setRole(role: 'student' | 'instructor' | 'general') {
    this.role = role;
  }
  isInstructor(): boolean {
    return this.role == 'instructor';
  }
  isStudent(): boolean {
    return this.role == 'student';
  }
  isAccessed(): boolean {
    return false;
  }

}

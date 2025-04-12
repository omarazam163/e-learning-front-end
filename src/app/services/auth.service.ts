import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../interfaces/register';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'https://localhost:7180/api';
  constructor() {}
  _http = inject(HttpClient);
  register(newUser: Register)
  {
    return this._http.post(this.url+ "/Auth/Register", newUser);
  }

  login(user:FormData)
  {
    return this._http.post(this.url + '/Auth/Login', user);
  }

  /*----------------------------*/
  // is student or instructor or general

  private role : "student" | "instructor" | "general" = "general" ;
  setRole(role : "student" | "instructor" | "general") {
    this.role = role;
  }
  isInstructor() : boolean { return this.role == "instructor" }
  isStudent() : boolean { return this.role == "student" }
  isGeneral() : boolean { return this.role == "general" }

}

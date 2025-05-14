import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const isStudentGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);
  if(_auth.islogin.getValue() == "Student") {
    return true;
  }
  else {
    _router.navigate(['/home']);
    return false;
  }
};

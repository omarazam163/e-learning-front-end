import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const instructorGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);
  if(_auth.islogin.getValue() == 'Instructor')
  {
    return true;
  }
  else
  {
    _router.navigate(['/home']);
    return false;
  }
};

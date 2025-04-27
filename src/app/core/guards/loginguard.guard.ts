import { AuthService } from './../services/auth.service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const loginGuard: CanActivateFn = (route, state) => {
  let _auth = inject(AuthService);
  const router = inject(Router);
  let islogin = _auth.islogin.getValue();
  if (!(islogin == 'noLogin'))
    {
      router.navigate(['/home']);
      return false;
    } 
  return islogin == 'noLogin';
};

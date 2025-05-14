import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const resetPasswordGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);
  if(_auth.emailToResetPassword=="")
  {
        _router.navigate(['/SendResetPassword']);
        return false;
  }
  else
  {
    return true;
  }
};

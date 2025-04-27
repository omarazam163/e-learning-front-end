import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isloggedGuard: CanActivateFn = (route, state) => {
    let _auth = inject(AuthService);
    const router = inject(Router);
    let islogin = _auth.islogin.getValue();
    if ((islogin == 'noLogin')) {
      router.navigate(['/home']);
      return false;
    }
    else
    {
      return true;
    }
};

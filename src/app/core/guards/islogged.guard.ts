import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isloggedGuard: CanActivateFn = (route, state) => {
        console.log('islogin');
    let _auth = inject(AuthService);
    const router = inject(Router);
    let islogin = _auth.islogin.getValue();
    if ((islogin == 'noLogin')) {
      router.navigate(['/home']);
      return false;
    }
    else
    {
      console.log('islogin', islogin);
      return true;
    }
};

import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { inject } from '@angular/core';
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const PID = inject(PLATFORM_ID);
  if (isPlatformBrowser(PID)) {
    if (localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
  }
  return next(req);
};

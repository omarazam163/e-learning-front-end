import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isloggedGuard } from './islogged.guard';

describe('isloggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isloggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

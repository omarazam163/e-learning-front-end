import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { instructorGuard } from './instructor.guard';

describe('instructorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => instructorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

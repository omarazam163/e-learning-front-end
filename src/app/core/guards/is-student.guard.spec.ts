import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isStudentGuard } from './is-student.guard';

describe('isStudentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isStudentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

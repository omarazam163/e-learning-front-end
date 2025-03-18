import { TestBed } from '@angular/core/testing';

import { CourseModulesService } from './course-modules.service';

describe('CourseModulesService', () => {
  let service: CourseModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

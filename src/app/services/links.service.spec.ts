import { TestBed } from '@angular/core/testing';

import { LinksService } from './links.service';

describe('LinksService', () => {
  let service: LinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

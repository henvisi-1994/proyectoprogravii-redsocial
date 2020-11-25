import { TestBed } from '@angular/core/testing';

import { ReaccioncdetService } from './reaccioncdet.service';

describe('ReaccioncdetService', () => {
  let service: ReaccioncdetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaccioncdetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

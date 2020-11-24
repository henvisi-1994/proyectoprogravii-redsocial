import { TestBed } from '@angular/core/testing';

import { MultimediaPubService } from './multimedia-pub.service';

describe('MultimediaPubService', () => {
  let service: MultimediaPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultimediaPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

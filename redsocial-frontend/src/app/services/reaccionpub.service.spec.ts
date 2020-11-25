import { TestBed } from '@angular/core/testing';

import { ReaccionpubService } from './reaccionpub.service';

describe('ReaccionpubService', () => {
  let service: ReaccionpubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaccionpubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

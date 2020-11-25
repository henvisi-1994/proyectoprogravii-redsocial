import { TestBed } from '@angular/core/testing';

import { ReaccioncomService } from './reaccioncom.service';

describe('ReaccioncomService', () => {
  let service: ReaccioncomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaccioncomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

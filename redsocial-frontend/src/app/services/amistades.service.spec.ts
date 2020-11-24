import { TestBed } from '@angular/core/testing';

import { AmistadesService } from './amistades.service';

describe('AmistadesService', () => {
  let service: AmistadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmistadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

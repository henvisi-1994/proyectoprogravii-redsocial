import { TestBed } from '@angular/core/testing';

import { DetalleprodService } from './detalleprod.service';

describe('DetalleprodService', () => {
  let service: DetalleprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UsuarioChatService } from './usuario-chat.service';

describe('UsuarioChatService', () => {
  let service: UsuarioChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

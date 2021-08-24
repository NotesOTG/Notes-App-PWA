import { TestBed } from '@angular/core/testing';

import { ServerUserService } from './server-user.service';

describe('ServerUserService', () => {
  let service: ServerUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

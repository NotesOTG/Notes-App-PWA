import { TestBed } from '@angular/core/testing';

import { AuthenticatedGaurdService } from './authenticated-gaurd.service';

describe('AuthenticatedGaurdService', () => {
  let service: AuthenticatedGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticatedGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

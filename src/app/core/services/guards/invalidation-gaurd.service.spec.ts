import { TestBed } from '@angular/core/testing';

import { InvalidationGaurdService } from './invalidation-gaurd.service';

describe('InvalidationGaurdService', () => {
  let service: InvalidationGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvalidationGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

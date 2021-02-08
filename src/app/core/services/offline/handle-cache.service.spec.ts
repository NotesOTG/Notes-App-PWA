import { TestBed } from '@angular/core/testing';

import { HandleCacheService } from './handle-cache.service';

describe('HandleCacheService', () => {
  let service: HandleCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

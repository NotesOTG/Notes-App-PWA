import { TestBed } from '@angular/core/testing';

import { CatchInterceptor } from './catch.interceptor';

describe('CatchInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CatchInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CatchInterceptor = TestBed.inject(CatchInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

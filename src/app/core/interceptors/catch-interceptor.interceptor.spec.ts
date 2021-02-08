import { TestBed } from '@angular/core/testing';

import { CatchInterceptorInterceptor } from './catch-interceptor.interceptor';

describe('CatchInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CatchInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CatchInterceptorInterceptor = TestBed.inject(CatchInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

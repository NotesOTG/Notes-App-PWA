import { TestBed } from '@angular/core/testing';

import { MobileActionButtonsService } from './mobile-action-buttons.service';

describe('MobileActionButtonsService', () => {
  let service: MobileActionButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileActionButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

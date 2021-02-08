import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileActionButtonsComponent } from './mobile-action-buttons.component';

describe('MobileActionButtonsComponent', () => {
  let component: MobileActionButtonsComponent;
  let fixture: ComponentFixture<MobileActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileActionButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

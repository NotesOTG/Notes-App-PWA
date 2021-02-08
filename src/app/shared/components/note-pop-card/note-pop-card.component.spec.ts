import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePopCardComponent } from './note-pop-card.component';

describe('TimePopCardComponent', () => {
  let component: NotePopCardComponent;
  let fixture: ComponentFixture<NotePopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotePopCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

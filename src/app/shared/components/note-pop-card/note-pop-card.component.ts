import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { StateTypes } from '../../models/state-types';

@Component({
  selector: 'app-note-pop-card',
  templateUrl: './note-pop-card.component.html',
  styleUrls: ['./note-pop-card.component.scss']
})
export class NotePopCardComponent implements OnInit, AfterViewInit {

  /**
   * The title for other comps to use, defaults to placeholder title
   */
  @Input() public title: string = 'Placeholder title';

  /**
   * The viewchild for a html element, finds the ElementRef
   */
  @ViewChild('card', {read: ElementRef}) public card: ElementRef;
  @ViewChild('div', {read: ElementRef}) public div: ElementRef;

  /**
   * The clicks to compare between two html elements
   */
  private clicks: number = 0;

  constructor(private noteService: NoteService) { }

  /**
   * Adds an onclick listener for two html elements
   */
  ngAfterViewInit(): void {
    this.card.nativeElement.onmousedown = () => {
      this.clicks++;
    }
    this.div.nativeElement.onmousedown = () => {
      this.clicks++;
      this.clicked();
    }
  }

  ngOnInit(): void {}

  /**
   * If a button pressed clear changes the state to default
   */
  closePressed(): void {
    this.noteService.stateSubject.next(StateTypes.DEFAULT);
  }

  /**
   * Gets called when the div element gets clicked,
   * Compares the clicks that were processed on 50ms timings
   * If result is odd changes the state to default
   * If result is even resets the clicks
   */
  private clicked(): void {
    setTimeout(() => {
      if (this.clicks % 2 === 1) {
        this.noteService.stateSubject.next(StateTypes.DEFAULT);
      }
      this.clicks = 0;
    }, 50);
  }

}

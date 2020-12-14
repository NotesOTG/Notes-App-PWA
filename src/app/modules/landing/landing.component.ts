import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/services/offline/note.service';
import { StateTypes } from 'src/app/shared/models/state-types';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(    
    public noteService: NoteService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  public createAndNavigateNotes() {
    if (this.router.url !== '/notes') {
      this.router.navigateByUrl('/notes');
    }
    setTimeout(() => {
      this.noteService.stateSubject.next(StateTypes.CREATE);
    }, 50);
  }

}

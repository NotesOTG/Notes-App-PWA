import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/services/offline/note.service';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent implements OnInit {

  constructor(public noteService: NoteService, public router: Router) { }

  async ngOnInit(): Promise<void> {
    
  }

}

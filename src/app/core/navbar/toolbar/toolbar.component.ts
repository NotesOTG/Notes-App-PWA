import { Component, OnInit } from '@angular/core';
import { StateTypes } from 'src/app/shared/models/state-types';
import { NoteService } from '../../services/offline/note.service';
import { ThemeService, ThemeType } from '../../services/offline/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public ThemeType = ThemeType;
  
  private _enabled = false;

  public stateTypes = StateTypes;

  constructor(public themeService: ThemeService, public noteService: NoteService) { }

  ngOnInit(): void {
  }

  public enable() {
    this._enabled = !this._enabled;
  }

  public get enabled(): boolean {
    return this._enabled;
  }

}

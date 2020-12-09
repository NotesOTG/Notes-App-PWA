import { Component, OnInit } from '@angular/core';
import { ThemeService, ThemeType } from '../../services/offline/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public ThemeType = ThemeType;
  
  private _enabled = false;

  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
  }

  public enable() {
    this._enabled = !this._enabled;
  }

  public get enabled(): boolean {
    return this._enabled;
  }

}

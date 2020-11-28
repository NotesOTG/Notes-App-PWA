import { Component, OnInit } from '@angular/core';
import { ThemeService, ThemeType } from '../../services/offline/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public ThemeType = ThemeType;
  

  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
  }



}

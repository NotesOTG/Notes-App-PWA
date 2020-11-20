import { Component, isDevMode, OnInit } from '@angular/core';
import { Catergories } from './shared/models/categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'notes-app-pwa';

  ngOnInit(): void {
    //console.log('is dev mode? ', isDevMode());
  }
  
}

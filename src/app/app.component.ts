import { Component, isDevMode, OnInit } from '@angular/core';
import { CheckForUpdateService } from './core/services/online/check-for-update.service';
import { InternetStatusService } from './core/services/online/internet-status.service';
import { Catergories } from './shared/models/categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'notes-app-pwa';

  constructor() {}

  ngOnInit(): void {
    //console.log('is dev mode? ', isDevMode());
    
  }
  
}

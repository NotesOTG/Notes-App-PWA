import { Component, isDevMode, OnInit } from '@angular/core';
import { ServerConfigurations } from './core/configs/server-configurations';
import { HandleCacheService } from './core/services/offline/handle-cache.service';
import { AuthenticationService } from './core/services/online/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'NotesOTG';

  // private auth: AuthenticationService
  constructor(private handleCache: HandleCacheService) {}

  ngOnInit(): void {
    this.handleCache.initService();
  }
  
}

import { Component, isDevMode, OnInit } from '@angular/core';
import { HandleCacheService } from './core/services/offline/handle-cache.service';
import { InstallService } from './core/services/offline/install.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'notes-app-pwa';

  constructor(private handleCache: HandleCacheService, private installService: InstallService) {}

  ngOnInit(): void {
    //console.log('is dev mode? ', isDevMode());
    this.handleCache.initService();
  }
  
}

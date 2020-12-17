import { Component, isDevMode, OnInit } from '@angular/core';
import { HandleCacheService } from './core/services/offline/handle-cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'notes-app-pwa';

  constructor(private handleCache: HandleCacheService) {}

  ngOnInit(): void {
    //console.log('is dev mode? ', isDevMode());
    this.handleCache.initService();
  }
  
}

import { Component, isDevMode, OnInit } from '@angular/core';
import { HandleCacheService } from './core/services/offline/handle-cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'NotesOTG';

  constructor(private handleCache: HandleCacheService) {}

  ngOnInit(): void {
    this.handleCache.initService();
  }
  
}

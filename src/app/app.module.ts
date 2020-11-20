import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './core/navbar/toolbar/toolbar.component';
import { ThemeService } from './core/services/offline/theme.service';
import { StorageService } from './core/services/offline/storage.service';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LandingComponent } from './modules/landing/landing.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    FlexLayoutModule
  ],
  providers: [
    ThemeService,
    StorageService,
    {provide: APP_INITIALIZER, useFactory: themeFactory, deps: [ThemeService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function themeFactory(themeService: ThemeService) {
  return () => themeService.setThemeOnStart();
}
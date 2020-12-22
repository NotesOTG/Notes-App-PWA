import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { NotePopCardComponent } from './shared/components/note-pop-card/note-pop-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddCardComponent } from './modules/note-card/add-card/add-card.component';
import { DeleteCardComponent } from './modules/note-card/delete-card/delete-card.component';
import { EditCardComponent } from './modules/note-card/edit-card/edit-card.component';
import { NoteCardComponent } from './modules/note-card/note-card.component';
import { ViewCardComponent } from './modules/note-card/view-card/view-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FocusDirective } from './core/directives/focus.directive';
import { InternetStatusService } from './core/services/online/internet-status.service';
import { CheckForUpdateService } from './core/services/online/check-for-update.service';
import { PopupDialogComponent } from './shared/components/popup-dialog/popup-dialog.component';
import { MobileActionButtonsComponent } from './shared/components/mobile-action-buttons/mobile-action-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LandingComponent,
    AddCardComponent,
    EditCardComponent,
    ViewCardComponent,
    NoteCardComponent,
    NotePopCardComponent,
    DeleteCardComponent,
    FocusDirective,
    PopupDialogComponent,
    MobileActionButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatListModule
  ],
  providers: [
    ThemeService,
    StorageService,
    InternetStatusService,
    CheckForUpdateService,
    {provide: APP_INITIALIZER, useFactory: themeFactory, deps: [ThemeService], multi: true},
    {provide: APP_INITIALIZER, useFactory: PWAFactory, deps:[InternetStatusService, CheckForUpdateService], multi: true},
    //{provide: APP_INITIALIZER, useFactory: udpateFactory, deps:[CheckForUpdateService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function themeFactory(themeService: ThemeService) {
  return () => themeService.setThemeOnStart();
}

export function PWAFactory(internetStatus: InternetStatusService, updates: CheckForUpdateService) {
  return () => {
    internetStatus.initService();
    updates.initService();
  };
}
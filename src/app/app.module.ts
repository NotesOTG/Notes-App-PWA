import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
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
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { NoteService } from './core/services/offline/note.service';
import { LoginComponent } from './modules/forms/login/login.component';
import { RegisterComponent } from './modules/forms/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { SiteConfigurations } from './core/configs/site-configurations';
import { AuthenticationService } from './core/services/online/authentication.service';
import { SettingsComponent } from './modules/account/settings/settings.component';
import { PasswordSettingsComponent } from './modules/account/settings/password-settings/password-settings.component';
import { GeneralSettingsComponent } from './modules/account/settings/general-settings/general-settings.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { CatchInterceptor } from './core/interceptors/catch.interceptor';
import { MatExpansionModule } from '@angular/material/expansion';
import { EmailSettingsComponent } from './modules/account/settings/email-settings/email-settings.component';

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
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PasswordSettingsComponent,
    GeneralSettingsComponent,
    EmailSettingsComponent,
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
    MatListModule,
    HttpClientModule,
    SocialLoginModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  providers: [
    ThemeService,
    StorageService,
    InternetStatusService,
    CheckForUpdateService,
    AuthenticationService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: SiteConfigurations.SNACK_DURATION}},
    {provide: APP_INITIALIZER, useFactory: themeFactory, deps: [ThemeService], multi: true},
    {provide: APP_INITIALIZER, useFactory: PWAFactory, deps:[InternetStatusService, CheckForUpdateService], multi: true},
    {provide: APP_INITIALIZER, useFactory: notesFactory, deps:[NoteService], multi: true},
    {provide: APP_INITIALIZER, useFactory: authenticationFactory, deps:[AuthenticationService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CatchInterceptor, multi: true},
    { provide: 'SocialAuthServiceConfig', useValue: socialConfig() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function themeFactory(themeService: ThemeService) {
  return () => themeService.setThemeOnStart();
}

export function notesFactory(notes: NoteService) {
  return () => notes.initService();
}

export function authenticationFactory(authService: AuthenticationService) {
  return () => authService.initService();
}

export function PWAFactory(internetStatus: InternetStatusService, updates: CheckForUpdateService) {
  return () => {
    internetStatus.initService();
    updates.initService();
  };
}

export function socialConfig() {
  return {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '421303202733-m5l1jvf5skjvpkpf9jm0d8omsj3buf4p.apps.googleusercontent.com',
          'profile email'
        )
      }
    ]
  } as SocialAuthServiceConfig;
}

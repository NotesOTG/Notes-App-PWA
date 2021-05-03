import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/services/guards/auth-guard.service';
import { SettingsMainComponent } from './modules/account/settings-main/settings-main.component';
import { LoginComponent } from './modules/forms/login/login.component';
import { RegisterComponent } from './modules/forms/register/register.component';
import { LandingComponent } from './modules/landing/landing.component';
import { NoteCardComponent } from './modules/note-card/note-card.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' 
  }, { 
    path: 'notes', component: NoteCardComponent, pathMatch: 'full'
  }, { 
    path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [AuthGuardService] 
  }, {
    path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuardService], 
  }, {
    path: 'settings', component: SettingsMainComponent, pathMatch: 'full', canActivate: [AuthGuardService], 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

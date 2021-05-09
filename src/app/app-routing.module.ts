import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGaurdService } from './core/services/guards/authenticated-gaurd.service';
import { InvalidationGaurdService } from './core/services/guards/invalidation-gaurd.service';
import { SettingsComponent } from './modules/account/settings/settings.component';
import { LoginComponent } from './modules/forms/login/login.component';
import { RegisterComponent } from './modules/forms/register/register.component';
import { LandingComponent } from './modules/landing/landing.component';
import { NoteCardComponent } from './modules/note-card/note-card.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' 
  }, { 
    path: 'notes', component: NoteCardComponent, pathMatch: 'full'
  }, { 
    path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [InvalidationGaurdService] 
  }, {
    path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [InvalidationGaurdService], 
  }, {
    path: 'settings', component: SettingsComponent, pathMatch: 'full', canActivate: [AuthenticatedGaurdService], 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

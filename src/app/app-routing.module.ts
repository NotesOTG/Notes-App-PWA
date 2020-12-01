import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './modules/add-card/add-card.component';
import { LandingComponent } from './modules/landing/landing.component';
import { ViewCardComponent } from './modules/time-card/view-card/view-card.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'add', component: AddCardComponent, pathMatch: 'full'},
  { path: 'notes', component: ViewCardComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleaRoutingModule } from './modulea-routing.module';
import { ModuleaComponent } from './modulea.component';
import { MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    ModuleaComponent
  ],
  imports: [
    CommonModule,
    ModuleaRoutingModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class ModuleaModule { }

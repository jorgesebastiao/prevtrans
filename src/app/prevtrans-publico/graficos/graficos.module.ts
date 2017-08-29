import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {GraficosComponent} from './graficos.component';
import {GraficosRoutes} from './graficos.module.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GraficosRoutes)
  ],
  declarations: [GraficosComponent]
})
export class GraficosModule { }

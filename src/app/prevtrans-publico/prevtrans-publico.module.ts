import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule} from 'angular2-materialize'
import {RouterModule} from '@angular/router';

import {AgmCoreModule} from '@agm/core';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { GraficosComponent } from './graficos/graficos.component';
import { AcidentesMapsComponent } from './acidentes-maps/acidentes-maps.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AgmCoreModule
  ],
  declarations: [HomeComponent, HeaderComponent, GraficosComponent, AcidentesMapsComponent, FooterComponent]
})
export class PrevtransPublicoModule { }

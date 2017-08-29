import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AgmCoreModule} from '@agm/core';

import {PrevtransPublicoRoutes} from './prevtrans-publico-routing.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AcidentesMapsComponent } from './acidentes-maps/acidentes-maps.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    RouterModule.forChild(PrevtransPublicoRoutes),
    AgmCoreModule
  ],
  declarations: [HomeComponent, HeaderComponent, AcidentesMapsComponent, FooterComponent]
})
export class PrevtransPublicoModule { }

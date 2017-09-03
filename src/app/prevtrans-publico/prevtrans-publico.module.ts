import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import {SharedModule} from '../shared/shared.module';
import {PrevtransPublicoRoutes} from './prevtrans-publico-routing.module';
import { PrevtransPublicoComponent } from './prevtrans-publico.component';
import { HeaderComponent } from './header/header.component';
import { AcidentesMapsComponent } from './acidentes-maps/acidentes-maps.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(PrevtransPublicoRoutes),
    AgmCoreModule
  ],
  declarations: [ PrevtransPublicoComponent, HeaderComponent, AcidentesMapsComponent, FooterComponent]
})
export class PrevtransPublicoModule { }

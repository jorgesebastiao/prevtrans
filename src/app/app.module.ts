import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {MaterializeModule} from 'angular2-materialize';
import {AgmCoreModule} from '@agm/core';

import { AppComponent } from './app.component';
import { PrevtransAdminModule } from './prevtrans-admin/prevtrans-admin.module';
import { PrevtransPublicoModule } from './prevtrans-publico/prevtrans-publico.module';
import {AppRoutes} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    PrevtransAdminModule,
    PrevtransPublicoModule,
    AppRoutes,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBM3AfwfdqdUA2NYbDrxelJzQBdI80hGwI'})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

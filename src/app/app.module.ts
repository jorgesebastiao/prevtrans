import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';

import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize';
import {AgmCoreModule} from '@agm/core';
import {SharedModule} from './shared/shared.module';
import { AppComponent } from './app.component';
import {AppRoutes} from './app.routes';
import {LoginModule} from './login/login.module';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';

@NgModule({
  declarations: [
    AppComponent,
    NaoAutorizadoComponent
    ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterializeModule,
    LoginModule,
    SharedModule.forRoot(),
    AppRoutes,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBM3AfwfdqdUA2NYbDrxelJzQBdI80hGwI'})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

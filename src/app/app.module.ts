import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import {AgmCoreModule} from '@agm/core';
import {SharedModule} from './shared/shared.module';
import { AppComponent } from './app.component';
import {AppRoutes} from './app.routes';
import {LoginModule} from './login/login.module';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    NaoAutorizadoComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule.forRoot(),
    CoreModule,
    LoginModule,
    AppRoutes,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBM3AfwfdqdUA2NYbDrxelJzQBdI80hGwI'})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

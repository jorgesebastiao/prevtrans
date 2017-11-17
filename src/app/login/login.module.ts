import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import {MoneyHttp} from '../shared/seguranca/money-http.service';
import {AuthService} from '../shared/seguranca/auth.service';
import {AuthGuard} from '../shared/seguranca/auth.guard';
import {LogoutService} from '../shared/seguranca/logout.service';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import {LoginsComponent} from './logins.component';
import {LoginRoutingModule} from './login.module.routing';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ],
    tokenName: 'tokenPrevtrans'
  });
  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [LoginsComponent, LoginComponent, RecuperarSenhaComponent],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class LoginModule { }

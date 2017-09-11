import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginRoutes} from './login.module.routing';
import {LoginComponent} from './login.component';
import {SharedModule} from '../shared/shared.module';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import {MoneyHttp} from '../shared/seguranca/money-http.service';
import {AuthService} from '../shared/seguranca/auth.service';
import {AuthGuard} from '../shared/seguranca/auth.guard';
import {LogoutService} from "../shared/seguranca/logout.service";

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ],
    tokenName: 'tokenPrevtrans'
  });

  // return new AuthHttp(config, http, options);
  return new MoneyHttp(auth, config, http, options);

}

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(LoginRoutes)
  ],
  declarations: [LoginComponent],
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

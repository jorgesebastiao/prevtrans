import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import {AUTH_LOGOUT} from '../../app.api';

@Injectable()
export class LogoutService {


  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) { }

  logout() {
    return this.http.delete(`${AUTH_LOGOUT}`, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}

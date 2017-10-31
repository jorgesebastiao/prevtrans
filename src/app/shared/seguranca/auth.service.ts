import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AUTH_LOGIN } from './../../app.api';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService {
  jwtPayload: any;
  constructor(private http: Http, private jwtHelper: JwtHelper) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    console.log(usuario);
    console.log(senha);
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic cHJldnRyYW5zYW5ndWxhcjpwcjN2dHJAbnNAbmd1bEBy==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(AUTH_LOGIN, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        console.log(response);
        this.armazenarToken(response.json().access_token);
      })
      .catch(response => {
        console.log(response);
        if (response.status === 400) {
         const falha = response.json();
          if (falha.error === 'invalid_grant') {
            return Promise.reject('usuario ou senha inválidos!!!')
          }
          return Promise.reject(response);
        }
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic cHJldnRyYW5zYW5ndWxhcjpwcjN2dHJAbnNAbmd1bEBy==');

    const body = 'grant_type=refresh_token';

    return this.http.post(AUTH_LOGIN, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('tokenPrevtrans');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('tokenPrevtrans', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('tokenPrevtrans');

    if (token) {
      this.armazenarToken(token);
    }
  }

  limparAccessToken() {
    localStorage.removeItem('tokenPrevtrans');
    this.jwtPayload = null;
    console.log(this.jwtPayload);
  }
}

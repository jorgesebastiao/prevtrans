import { Injectable } from '@angular/core';
import {PREVTRANS_API} from '../../app.api';
import {ErrorHandlerService} from '../error-handler.service';
import {Http, Headers} from '@angular/http';

@Injectable()
export class RecuperarSenhaService {

  constructor(private  http: Http, private hand: ErrorHandlerService) { }

  recuperarSenha(email: string): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${PREVTRANS_API}/usuarios/recuperar-senha`, email,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {

      })
      .catch(response => {
        console.log(response);
        if (response.status === 404) {
          const falha = response.json();
          if (falha.error === 'invalid_grant') {
            return Promise.reject('usuario ou senha inválidos!!!')
          }
          return Promise.reject(response);
        }
      });
  }
}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {PREVTRANS_API} from '../../app.api';
import {PrevtransAdminHerrorHandler} from '../../prevtrans-admin/prevtrans-admin-herror-handler';
import {Pessoa} from '../models';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class PessoaService {

  constructor(private http: AuthHttp) { }

  pessoas(): Observable<Pessoa[]> {
    return this.http.get(`${PREVTRANS_API}/pessoas`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }
  postPessoa( pessoa: Pessoa): Observable<String> {
    return this.http.post(`${PREVTRANS_API}/pessoas`,
      JSON.stringify(pessoa))
      .map(response => response.json());
  }
}

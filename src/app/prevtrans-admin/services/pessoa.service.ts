import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {PREVTRANS_API} from '../../app.api';
import {PrevtransAdminHerrorHandler} from '../prevtrans-admin-herror-handler';
import {Pessoa} from '../../shared/models';

@Injectable()
export class PessoaService {

  constructor(private http: Http) { }

  pessoas(): Observable<Pessoa[]> {
    return this.http.get(`${PREVTRANS_API}/pessoas`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }
  postPessoa( pessoa: Pessoa): Observable<String> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${PREVTRANS_API}/pessoas`,
      JSON.stringify(pessoa),
      new RequestOptions({headers: headers}))
      .map(response => response.json());
  }
}

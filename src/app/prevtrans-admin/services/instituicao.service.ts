import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

import {PREVTRANS_API} from '../../app.api';
import {Instituicao} from '../models/instituicao.model';
import {PrevtransAdminHerrorHandler} from '../prevtrans-admin-herror-handler';

@Injectable()
export class InstituicaoService {


  constructor(private http: Http) {
  }

  instituicoes(): Observable<Instituicao[]> {
    return this.http.get(`${PREVTRANS_API}/instituicoes`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  getInstituicao(id: string): Observable<Instituicao> {
    return this.http.get(`${PREVTRANS_API}/instituicoes/${id}`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  postInstituicao(instituicao: Instituicao): Observable<String> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${PREVTRANS_API}/instituicoes`,
      JSON.stringify(instituicao),
      new RequestOptions({headers: headers}))
      .map(response => response.json());
  }
  putInstituicao(instituicao: Instituicao):Observable<String>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${PREVTRANS_API}/instituicoes`,
      JSON.stringify(instituicao),
      new RequestOptions({headers: headers}))
      .map(response => response.json());
  }
}

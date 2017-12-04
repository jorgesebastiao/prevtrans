import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {PREVTRANS_API} from '../../app.api';
import {Instituicao} from '../models/instituicao.model';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';

@Injectable()
export class InstituicaoService {


  constructor(private http: AuthHttp, private hand: ErrorHandlerService) {
  }

  instituicoes(busca?: string): Observable<Instituicao[]> {
    return this.http.get(`${PREVTRANS_API}/instituicoes`, {params: {busca}})
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<Instituicao[]>([]);
      });
  }

  getInstituicao(id: string): Observable<Instituicao> {
    return this.http.get(`${PREVTRANS_API}/instituicoes/${id}`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<Instituicao>();
      });
  }

  verificaCnpj(cnpj: string, id?: string) {
    return this.http.get(`${PREVTRANS_API}/instituicoes/usuario/${cnpj}`, {params: {id}})
      .map(response => response.text() ? response.json() : response)
      .catch(erro => Observable.throw(erro));
  }

  verificaEmail(email: string, id?: string) {
    return this.http.get(`${PREVTRANS_API}/instituicoes/email/${email}`, {params: {id}})
      .map(response => response.text() ? response.json() : response)
      .catch(erro => Observable.throw(erro));
  }

  postInstituicao(instituicao: Instituicao): Observable<String> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${PREVTRANS_API}/instituicoes`,
      JSON.stringify(instituicao))
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<String>();
      });
  }

  putInstituicao(id: string, instituicao: Instituicao): Observable<String> {
    return this.http.put(`${PREVTRANS_API}/instituicoes/${id}`,
      JSON.stringify(instituicao))
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<String>();
      });
  }
}

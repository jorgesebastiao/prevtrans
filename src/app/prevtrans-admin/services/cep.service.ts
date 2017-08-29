import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {CEP_API} from '../../app.api';
import {PrevtransAdminHerrorHandler} from '../prevtrans-admin-herror-handler';
import {Cep} from '../../shared/models';

@Injectable()
export class CepService {

  constructor(private http: Http) { }

  consultaCep( cep: string): Observable<Cep>{
    return this.http.get(`${CEP_API}/${cep}/json`)
      .map(response => response.json())
      .catch(PrevtransAdminHerrorHandler.handleError);
  }
}

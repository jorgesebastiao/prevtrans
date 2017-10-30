import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {CEP_API} from '../../app.api';
import {PrevtransAdminHerrorHandler} from '../../prevtrans-admin/prevtrans-admin-herror-handler';

@Injectable()
export class CepService {

  constructor(private http: Http) { }

  consultaCep( cep: string): Observable<any>{
    return this.http.get(`${CEP_API}/${cep}/json`)
      .map(response => response.json())
      .catch(PrevtransAdminHerrorHandler.handleError);
  }
}

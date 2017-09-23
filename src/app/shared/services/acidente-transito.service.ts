import {Injectable} from '@angular/core';
import {Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

import {PREVTRANS_API} from '../../app.api';
import {PrevtransAdminHerrorHandler} from '../../prevtrans-admin/prevtrans-admin-herror-handler';
import {AcidenteTransito} from '../models/acidenteTransito.model';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class AcidenteTransitoService {

  constructor(private http: AuthHttp) { }

  acidentesTransito(): Observable<AcidenteTransito[]> {
    return this.http.get(`${PREVTRANS_API}/acidentes-de-transito`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  uploadImagem(formdata: any): Promise<void>{
    const form = formdata;
    console.log(formdata);
    const headers = new Headers();
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post(`${PREVTRANS_API}/acidentes-de-transito/imagens`, formdata)
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        console.log(response);
        if (response.status === 400){
          const falha= response.json();
          console.log('falha'+falha);
          return Promise.reject(response);
        }
      });
  }
}

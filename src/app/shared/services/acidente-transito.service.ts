import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

import {PREVTRANS_API} from '../../app.api';
import {PrevtransAdminHerrorHandler} from '../../prevtrans-admin/prevtrans-admin-herror-handler';
import {AcidenteTransito} from '../models/acidenteTransito.model';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';
import {AuthService} from '../seguranca/auth.service';

@Injectable()
export class AcidenteTransitoService {

  constructor(private authHttp: AuthHttp, private http: Http, private  auth: AuthService, private hand: ErrorHandlerService) {
  }

  acidentesTransito(): Observable<AcidenteTransito[]> {
    return this.authHttp.get(`${PREVTRANS_API}/acidentes-de-transito`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  getAcidenteTransito(id: string): Observable<AcidenteTransito> {
    return this.authHttp.get(`${PREVTRANS_API}/acidentes-de-transito/${id}`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<AcidenteTransito>();
      });
  }

  uploadImagem(formdata: any): Promise<void> {
    const headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log(formdata);
    return this.authHttp.post(`${PREVTRANS_API}/acidentes-de-transito/imagens`, formdata)
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        console.log(response);
        if (response.status === 400) {
          const falha = response.json();
          console.log('falha' + falha);
          return Promise.reject(response);
        }
      });
  }

  upload(formdata: any): Observable<String> {
    const headers = new Headers();
    this.auth.obterNovoAccessToken();
    const token = localStorage.getItem('tokenPrevtrans');
    headers.append('Authorization', 'bearer ' + token);
    return this.http.post(`${PREVTRANS_API}/acidentes-de-transito/imagens`,
      formdata, {headers, withCredentials: true})
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        console.log('falha' + error);
        return Observable.of<String>();
      });
  }

  postAcidenteDeTransito(acidenteTransito: AcidenteTransito): Observable<String> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.authHttp.post(`${PREVTRANS_API}/acidentes-de-transito`,
      JSON.stringify(acidenteTransito))
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<String>();
      });
  }

  putAcidenteDeTransito(acidenteTransito: AcidenteTransito): Observable<String> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.authHttp.put(`${PREVTRANS_API}/acidentes-de-transito`,
      JSON.stringify(acidenteTransito))
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<String>();
      });
  }
}

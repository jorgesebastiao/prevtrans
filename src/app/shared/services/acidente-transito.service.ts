import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

import {PREVTRANS_API} from '../../app.api';
import {PrevtransAdminHerrorHandler} from '../../prevtrans-admin/prevtrans-admin-herror-handler';
import {AcidenteTransito} from '../models/acidenteTransito.model';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';

@Injectable()
export class AcidenteTransitoService {

  constructor(private authHttp: AuthHttp, private http: Http, private hand: ErrorHandlerService) {
  }

  getAcidenteTransito(id: string): Observable<AcidenteTransito> {
    return this.authHttp.get(`${PREVTRANS_API}/acidentes-de-transito/${id}`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<AcidenteTransito>();
      });
  }

  acidenteTransitoPublico(): Observable<AcidenteTransito[]> {
    return this.http.get(`${PREVTRANS_API}/acidentes-de-transito`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }


  acidentesTransito(busca?: string): Observable<AcidenteTransito[]> {
    return this.authHttp.get(`${PREVTRANS_API}/acidentes-de-transito`, {params: {busca}})
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  acidentesTransitoPorInstituicao(id: string, busca?: string): Observable<AcidenteTransito[]> {
    return this.authHttp.get(`${PREVTRANS_API}/acidentes-de-transito/instituicoes/${id}`, {params: {busca}})
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  postAcidenteDeTransito(idInstituicao: string, acidenteTransito: AcidenteTransito): Observable<String> {
    return this.authHttp.post(`${PREVTRANS_API}/acidentes-de-transito/instituicoes/${idInstituicao}`,
      JSON.stringify(acidenteTransito))
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<String>();
      });
  }

  putAcidenteDeTransito(id: string, acidenteTransito: AcidenteTransito): Observable<String> {
    return this.authHttp.put(`${PREVTRANS_API}/acidentes-de-transito/${id}`,
      JSON.stringify(acidenteTransito))
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<String>();
      });
  }

  deleteAcidenteTransito(id: string): Observable<String> {
    return this.authHttp.delete(`${PREVTRANS_API}/acidentes-de-transito/${id}`)
      .map(response => response.text() ? response.json() : response);
  }

  deleteVeiculos(id: string, id2: string): Observable<String> {
    return this.authHttp.delete(`${PREVTRANS_API}/acidentes-de-transito/${id}/veiculos/${id2}`)
      .map(response => response.text() ? response.json() : response);
  }
}

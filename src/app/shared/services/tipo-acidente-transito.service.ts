import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';
import {Observable} from 'rxjs/Observable';
import {PREVTRANS_API} from '../../app.api';
import {TipoAcidenteTransito} from '../models';

@Injectable()
export class TipoAcidenteTransitoService {

  constructor(private http: AuthHttp, private hand: ErrorHandlerService) { }

  tiposAcidentesTransito(): Observable<TipoAcidenteTransito[]> {
    return this.http.get(`${PREVTRANS_API}/tipos-acidentes-transito`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<TipoAcidenteTransito[]>([]);
      });
  }
}

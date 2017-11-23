import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';
import {PREVTRANS_API} from '../../app.api';
import {Observable} from 'rxjs/Observable';
import {Sinalizacao} from '../models/sinalizacao.model';

@Injectable()
export class SinalizacaoService {

  constructor(private http: AuthHttp, private hand: ErrorHandlerService) { }

  sinalizacoes(): Observable<Sinalizacao[]> {
    return this.http.get(`${PREVTRANS_API}/sinalizacoes`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<Sinalizacao[]>([]);
      });
  }
}

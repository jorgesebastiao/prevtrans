import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';
import {Observable} from 'rxjs/Observable';
import {PREVTRANS_API} from '../../app.api';
import {Pista} from '../models/pista.model';

@Injectable()
export class PistaService {

  constructor(private http: AuthHttp, private hand: ErrorHandlerService) { }

  pistas(): Observable<Pista[]> {
    return this.http.get(`${PREVTRANS_API}/pistas`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<Pista[]>([]);
      });
  }
}

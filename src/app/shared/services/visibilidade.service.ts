import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';
import {Observable} from 'rxjs/Observable';
import {Visibilidade} from '../models';
import {PREVTRANS_API} from '../../app.api';

@Injectable()
export class VisibilidadeService {

  constructor(private http: AuthHttp, private hand: ErrorHandlerService) { }

  visibilidades(): Observable<Visibilidade[]> {
    return this.http.get(`${PREVTRANS_API}/visibilidades`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<Visibilidade[]>([]);
      });
  }
}

import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';
import {Observable} from 'rxjs/Observable';
import {PREVTRANS_API} from '../../app.api';
import {Clima} from '../models';

@Injectable()
export class ClimaService {

  constructor(private http: AuthHttp, private hand: ErrorHandlerService) { }

  climas(): Observable<Clima[]> {
    return this.http.get(`${PREVTRANS_API}/climas`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<Clima[]>([]);
      });
  }
}

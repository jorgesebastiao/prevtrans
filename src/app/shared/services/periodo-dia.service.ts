import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';
import {Observable} from 'rxjs/Observable';
import {PeriodoDia} from '../models/periodoDia.model';
import {PREVTRANS_API} from '../../app.api';

@Injectable()
export class PeriodoDiaService {

  constructor(private http: AuthHttp, private hand: ErrorHandlerService) { }

  periodosDias(): Observable<PeriodoDia[]> {
    return this.http.get(`${PREVTRANS_API}/periodos-dias`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<PeriodoDia[]>([]);
      });
  }
}

import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';
import {Observable} from 'rxjs/Observable';
import {PREVTRANS_API} from '../../app.api';
import {CondicaoDaVia, TipoVia} from '../models';

@Injectable()
export class ViaService {

  constructor(private http: AuthHttp, private hand: ErrorHandlerService) {
  }

  tiposVias(): Observable<TipoVia[]> {
    return this.http.get(`${PREVTRANS_API}/vias/tipos`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<TipoVia[]>([]);
      });
  }

  condicoesDaVia(): Observable<CondicaoDaVia[]> {
    return this.http.get(`${PREVTRANS_API}/vias/condicoes`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<CondicaoDaVia[]>([]);
      });
  }
}

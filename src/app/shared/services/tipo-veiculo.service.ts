import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {ErrorHandlerService} from '../error-handler.service';
import {Observable} from 'rxjs/Observable';
import {PREVTRANS_API} from '../../app.api';
import {TipoVeiculo} from '../models/tipoVeiculo.model';

@Injectable()
export class TipoVeiculoService {

  constructor(private http: AuthHttp, private hand: ErrorHandlerService) {
  }
  tiposVeiculos(): Observable<TipoVeiculo[]> {
    return this.http.get(`${PREVTRANS_API}/tipos-veiculos`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<TipoVeiculo[]>([]);
      });
  }
  getTipoVeiculo(id: string): Observable<TipoVeiculo> {
    return this.http.get(`${PREVTRANS_API}/tipos-veiculos/${id}`)
      .map(response => response.json()).catch(error => {
        this.hand.handle(error);
        return Observable.of<TipoVeiculo>();
      });
  }
}

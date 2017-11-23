import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {PREVTRANS_API} from '../../app.api';
import {PrevtransAdminHerrorHandler} from '../../prevtrans-admin/prevtrans-admin-herror-handler';
import {DataGraficos} from '../models/dataGraficos.model';

@Injectable()
export class AnalisaAcidenteTransitoService {
  URL_API = PREVTRANS_API + '/analise-acidentes-de-transito';

  constructor(private http: Http) {
  }

  dadosClima(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-clima`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosCondicaoDaVia(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-condicao-via`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosPeriodoDia(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-periodo-dia`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosPista(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-pista`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosSinalizacao(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-sinalizacao`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosTipoAcidenteTransito(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-tipo-acidente-transito`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosTipoVeiculo(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-tipo-veiculo`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosTipoVia(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-tipo-via`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosVisibilidade(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-visibilidade`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosDias(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-dias`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosSemanas(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-semanas`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }

  dadosMeses(): Observable<DataGraficos[]> {
    return this.http.get(`${this.URL_API}/dados-meses`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }
}

import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

import {PREVTRANS_API} from '../../app.api';
import {PrevtransAdminHerrorHandler} from '../../prevtrans-admin/prevtrans-admin-herror-handler';
import {AcidenteTransito} from '../models/acidenteTransito.model';
@Injectable()
export class AcidenteTransitoService {

  constructor(private http: Http) { }

  acidentesTransito(): Observable<AcidenteTransito[]> {
    return this.http.get(`${PREVTRANS_API}/acidentes-de-transito`)
      .map(response => response.json()).catch(PrevtransAdminHerrorHandler.handleError);
  }
}

import {Injectable} from '@angular/core';
import {LatLngLiteral, MapsAPILoader} from '@agm/core';
import {Localizacao} from '../models/localizacao.model';
import {Observable} from 'rxjs/Observable';

declare const google: any;

@Injectable()
export class GoogleMapsService {
  localizacao: Localizacao;

  constructor(private loader: MapsAPILoader) {
  }

  localizacaoAcidente(latitude: number, longitude: number): Observable<Localizacao> {
    this.localizacao = new Localizacao();
    this.localizacao.latitude = latitude;
    this.localizacao.longitude = longitude;
    const latLng: LatLngLiteral = {
      lat: latitude,
      lng: longitude
    };
    this.loader.load().then(() => {
      const geoCoder = new google.maps.Geocoder();
      geoCoder.geocode({'location': latLng}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const localizacao = results[0].address_components;
          for (let loc of localizacao) {
            if (loc.types[0] === 'route') {
              if (loc.long_name !== 'Unnamed Road') {
                this.localizacao.endereco = loc.long_name;
              }
            }
            if (loc.types[1] === 'sublocality') {
              this.localizacao.bairro = loc.long_name;
            }
            if (loc.types[0] === 'administrative_area_level_2') {
              this.localizacao.cidade = loc.long_name;
            }
            if (loc.types[0] === 'administrative_area_level_1') {
              this.localizacao.estado = loc.long_name;
            }
            if (loc.types[0] === 'country') {
              this.localizacao.pais = loc.long_name;
            }
            if (loc.types[0] === 'postal_code') {
              this.localizacao.cep = loc.long_name;
              this.localizacao.cep = this.localizacao.cep.replace('-', '');
            }
          }
        }
      });
    });
    return Observable.of(this.localizacao);
  }

  buscaEndereco(address: string){
    this.loader.load().then(() => {
    const geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
        console.log('chegou aki');
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
        }else{

        }
      });

    });
    }
}

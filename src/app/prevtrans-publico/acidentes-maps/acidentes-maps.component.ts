import {Component, OnInit} from '@angular/core';
import {AcidenteTransito} from '../../shared/models/acidenteTransito.model';
import {AcidenteTransitoService} from '../../shared/services/acidente-transito.service';
import {Clima, PeriodoDia} from '../../shared/models';
import {CondicaoDaVia} from '../../shared/models/condicaoDaVia.model';
import {Pista} from '../../shared/models/pista.model';
import {Sinalizacao} from '../../shared/models/sinalizacao.model';
import {TipoAcidenteTransito} from '../../shared/models/tipoAcidenteTransito.model';
import {TipoVia} from '../../shared/models/tipoVia.model';
import {Visibilidade} from '../../shared/models/visibilidade.model';

declare var jQuery: any;
@Component({
  selector: 'app-acidentes-maps',
  templateUrl: './acidentes-maps.component.html',
  styleUrls: ['./acidentes-maps.component.css']
})

export class AcidentesMapsComponent implements OnInit {
  acidentesTransito: AcidenteTransito[];
  acidenteTransito: AcidenteTransito;

  constructor(private acidenteTransitoService: AcidenteTransitoService) { }

  ngOnInit() {
    this.acidenteTransito = new AcidenteTransito;
    this.acidenteTransito.cep = '00000000';
    this.acidenteTransito.clima = new Clima;
    this.acidenteTransito.condicaoDaVia = new CondicaoDaVia;
    this.acidenteTransito.periodoDia = new  PeriodoDia;
    this.acidenteTransito.pista = new Pista;
    this.acidenteTransito.sinalizacao = new Sinalizacao;
    this.acidenteTransito.tipoAcidenteTransito = new TipoAcidenteTransito;
    this.acidenteTransito.tipoVia = new TipoVia;
    this.acidenteTransito.visibilidade = new Visibilidade;
    this.inicializaJquery();
    this.acidenteTransitoService.acidenteTransitoPublico()
      .subscribe(acidentesTransito =>  this.acidentesTransito = acidentesTransito);
  }
  lat:  number=  -27.900756;
  lng:  number=  -50.756954;
  zoom: number= 15;

  clickedMarker(acidenteTransito: AcidenteTransito) {
    this.acidenteTransito = acidenteTransito;
    console.log(`clicked the marker: ${acidenteTransito.idAcidenteTransito}`);
    jQuery('#exibe-informacao').modal('open');
  }
  // inicializa Jquery Materialize
  inicializaJquery() {
    jQuery(document).ready(function(){
      jQuery('.modal').modal();
      jQuery('.slider').slider();
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {AnalisaAcidenteTransitoService} from '../../shared/services/analisa-acidente-transito.service';
import {DataGraficos} from '../../shared/models/dataGraficos.model';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  climaDados: DataGraficos[];
  condicaoDaViaDados: DataGraficos[];
  periodoDiaDados: DataGraficos[];
  pistaDados: DataGraficos[];
  sinalizacaoDados: DataGraficos[];
  tipoViaDados: DataGraficos[];
  tipoAcidenteTransitoDados: DataGraficos[];
  visibilidadeDados: DataGraficos[];
  colorScheme = {
    domain: ['#2980b9', '#f1c40f', '#34495e', '#d35400']
  };


  constructor(private analisaAcidenteTransitoService: AnalisaAcidenteTransitoService) {}

  ngOnInit() {
    this.climaDados = [];
    this.condicaoDaViaDados = [];
    this.periodoDiaDados = [];
    this.pistaDados = [];
    this.sinalizacaoDados = [];
    this.tipoAcidenteTransitoDados = [];
    this.tipoViaDados = [];
    this.visibilidadeDados = [];
    this.listaDadosClima();
    this.listaDadosCondicaoDaVia();
    this.listaDadosPeriodoDia();
    this.listaDadosPista();
    this.listaDadosSinalizacao();
    this.listaDadosTipoAcidenteTransito();
    this.listaDadosTipoVia();
    this.listaDadosVisibilidade();
  }
  onSelect(event) {
    console.log(event);
  }

  listaDadosClima(){
    this.analisaAcidenteTransitoService.dadosClima()
      .subscribe(climaDados => this.climaDados = climaDados);
  }
  listaDadosCondicaoDaVia(){
    this.analisaAcidenteTransitoService.dadosCondicaoDaVia()
      .subscribe(condicaoDaViaDados => this.condicaoDaViaDados = condicaoDaViaDados);
  }
  listaDadosPeriodoDia(){
    this.analisaAcidenteTransitoService.dadosCondicaoDaVia()
      .subscribe(periodoDiaDados => this.periodoDiaDados = periodoDiaDados);
  }
  listaDadosPista(){
    this.analisaAcidenteTransitoService.dadosPista()
      .subscribe(pistaDados => this.pistaDados = pistaDados);
  }
  listaDadosSinalizacao(){
    this.analisaAcidenteTransitoService.dadosSinalizacao()
      .subscribe(sinalizacaoDados => this.sinalizacaoDados = sinalizacaoDados);
  }
  listaDadosTipoAcidenteTransito(){
    this.analisaAcidenteTransitoService.dadosTipoAcidenteTransito()
      .subscribe(tipoAcidenteTransitoDados => this.tipoAcidenteTransitoDados = tipoAcidenteTransitoDados);
  }
  listaDadosTipoVia(){
    this.analisaAcidenteTransitoService.dadosTipoVia()
      .subscribe(tipoViaDados => this.tipoViaDados = tipoViaDados);
  }
  listaDadosVisibilidade(){
    this.analisaAcidenteTransitoService.dadosVisibilidade()
      .subscribe( visibilidadeDados => this.visibilidadeDados = visibilidadeDados);
  }
}

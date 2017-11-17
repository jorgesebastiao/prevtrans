import {Component, OnInit} from '@angular/core';
import {AnalisaAcidenteTransitoService} from '../../shared/services/analisa-acidente-transito.service';
import {DataGraficos} from '../../shared/models/dataGraficos.model';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  diaDados: DataGraficos[];
  semanaDados: DataGraficos[];
  mesDados: DataGraficos[];
  climaDados: DataGraficos[];
  condicaoDaViaDados: DataGraficos[];
  periodoDiaDados: DataGraficos[];
  pistaDados: DataGraficos[];
  sinalizacaoDados: DataGraficos[];
  tipoViaDados: DataGraficos[];
  tipoAcidenteTransitoDados: DataGraficos[];
  visibilidadeDados: DataGraficos[];
  // configuração gráfico de barras
  colorSchemeBarra = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  colorScheme = {
    domain: ['#2980b9', '#f1c40f', '#34495e', '#d35400']
  };


  constructor(private analisaAcidenteTransitoService: AnalisaAcidenteTransitoService) {
  }

  ngOnInit() {
    this.diaDados = [];
    this.semanaDados = [];
    this.mesDados = [];
    this.climaDados = [];
    this.condicaoDaViaDados = [];
    this.periodoDiaDados = [];
    this.pistaDados = [];
    this.sinalizacaoDados = [];
    this.tipoAcidenteTransitoDados = [];
    this.tipoViaDados = [];
    this.visibilidadeDados = [];
    this.listaDadosDia();
    this.listaDadosSemana();
    this.listaDadosMes();
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

  listaDadosDia() {
    this.analisaAcidenteTransitoService.dadosDias()
      .subscribe(diaDados => this.diaDados = diaDados);
  }

  listaDadosSemana() {
    this.analisaAcidenteTransitoService.dadosSemanas()
      .subscribe(semanaDados => this.semanaDados = semanaDados);
  }

  listaDadosMes() {
    this.analisaAcidenteTransitoService.dadosMeses()
      .subscribe(mesDados => this.mesDados = mesDados);
  }

  listaDadosClima() {
    this.analisaAcidenteTransitoService.dadosClima()
      .subscribe(climaDados => this.climaDados = climaDados);
  }

  listaDadosCondicaoDaVia() {
    this.analisaAcidenteTransitoService.dadosCondicaoDaVia()
      .subscribe(condicaoDaViaDados => this.condicaoDaViaDados = condicaoDaViaDados);
  }

  listaDadosPeriodoDia() {
    this.analisaAcidenteTransitoService.dadosPeriodoDia()
      .subscribe(periodoDiaDados => this.periodoDiaDados = periodoDiaDados);
  }

  listaDadosPista() {
    this.analisaAcidenteTransitoService.dadosPista()
      .subscribe(pistaDados => this.pistaDados = pistaDados);
  }

  listaDadosSinalizacao() {
    this.analisaAcidenteTransitoService.dadosSinalizacao()
      .subscribe(sinalizacaoDados => this.sinalizacaoDados = sinalizacaoDados);
  }

  listaDadosTipoAcidenteTransito() {
    this.analisaAcidenteTransitoService.dadosTipoAcidenteTransito()
      .subscribe(tipoAcidenteTransitoDados => this.tipoAcidenteTransitoDados = tipoAcidenteTransitoDados);
  }

  listaDadosTipoVia() {
    this.analisaAcidenteTransitoService.dadosTipoVia()
      .subscribe(tipoViaDados => this.tipoViaDados = tipoViaDados);
  }

  listaDadosVisibilidade() {
    this.analisaAcidenteTransitoService.dadosVisibilidade()
      .subscribe(visibilidadeDados => this.visibilidadeDados = visibilidadeDados);
  }
}

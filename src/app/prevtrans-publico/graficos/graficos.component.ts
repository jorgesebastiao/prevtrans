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
    domain: ['#2F4F4F', '#696969', '#191970', '#6495ED', '#483D8B', '#6A5ACD', '#7B68EE', '#1E90FF',
      '#FDF5E6', '#FFDAB9', '#FFDEAD', '#F0FFF0', '#F0F8FF', '#E6E6FA', '#FFF0F5', '#FFE4E1', '#CFCFCF',
      '#87CEFA', '#4682B4', '#5F9EA0', '#66CDAA', '#006400', '#556B2F', '#8FBC8F', '#2E8B57', '#98FB98',
      '#7CFC00', '#F0E68C', '#FFFF00', '#DAA520', '#B8860B', '#BC8F8F', '#CD5C5C', '#F4A460', '#FFA07A',
      '#FF4500', '#FF0000', '#FF69B4', '#DB7093', '#C71585', '#00BFFF']
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

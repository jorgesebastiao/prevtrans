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
  pistaDados: DataGraficos[];
  sinalizacaoDados: DataGraficos[];
  visibilidadeDados: DataGraficos[];
  tipoViaDados: DataGraficos[];
  tipoAcidenteTransitoDados: DataGraficos[];

  colorScheme = {
    domain: ['#2980b9', '#f1c40f', '#34495e', '#d35400']
  };


  constructor(private analisaAcidenteTransitoService: AnalisaAcidenteTransitoService) {}

  ngOnInit() {
    this.climaDados = [];
    this.pistaDados = [];
    this.sinalizacaoDados = [];
    this.visibilidadeDados = [];
    this.tipoViaDados = [];
    this.tipoAcidenteTransitoDados = [];
    this.listaDadosClima();
    this.listaDadosPista();
    this.listaDadosSinalizacao();
    this.listaDadosTipoAcidenteTransito();
    this.listaDadosTipoVia();
  }
  onSelect(event) {
    console.log(event);
  }

  listaDadosClima(){
    this.analisaAcidenteTransitoService.dadosClima()
      .subscribe(climaDados => this.climaDados = climaDados);
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
}

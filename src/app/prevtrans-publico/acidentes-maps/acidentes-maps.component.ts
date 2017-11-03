import {Component, OnInit} from '@angular/core';
import {AcidenteTransito} from '../../shared/models/acidenteTransito.model';
import {AcidenteTransitoService} from '../../shared/services/acidente-transito.service';

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

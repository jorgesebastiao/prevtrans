import { Component, OnInit } from '@angular/core';
import {AcidenteTransito} from '../../../../shared/models/acidenteTransito.model';

@Component({
  selector: 'app-acidentes-de-transitos',
  templateUrl: './acidentes-de-transitos.component.html',
  styleUrls: ['./acidentes-de-transitos.component.css']
})
export class AcidentesDeTransitosComponent implements OnInit {

  acidentesTransitos: AcidenteTransito[]=[
    {
      idAcidenteTransito: '1'
    },
    {
    idAcidenteTransito: '2'
    }
    ];
  acidenteTransito: AcidenteTransito;
  constructor() { }

  ngOnInit() {

  }

  selecionaAcidenteTransito(acidenteTransito: AcidenteTransito){
      this.acidenteTransito=  acidenteTransito;
  }
}

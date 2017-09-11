import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AcidenteTransito} from '../../../../shared/models/acidenteTransito.model';

declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'app-cadastro-acidente-de-transito',
  templateUrl: './cadastro-acidente-de-transito.component.html',
  styleUrls: ['./cadastro-acidente-de-transito.component.css']
})
export class CadastroAcidenteDeTransitoComponent implements OnInit {

  acidenteTransitoForm : FormGroup;
  acidenteTransito : AcidenteTransito;

  constructor(private formBuilder: FormBuilder) { }

  lat:  number=  -27.900756;
  lng:  number=  -50.756954;
  zoom: number= 15;

  ngOnInit() {
    this.acidenteTransito= new AcidenteTransito();
    this.validaForm();
    this.inicializaMaterialize();
    this.inicializaModal();
  }
  validaForm(){
    this.acidenteTransitoForm = this.formBuilder.group(
      {
        tituloPublicacao: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(1000)]),
        latitude: this.formBuilder.control('',[Validators.required]),
        longitude: this.formBuilder.control('',[Validators.required])
      }
    );
  }

  inicializaMaterialize() {
    jQuery(document).ready(function () {
      Materialize.updateTextFields();
    });
  }
  inicializaModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal();
    });
  }
  buscaLatitudeLongitude() {
    jQuery('#modal-busca').modal('open');
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AcidenteTransito, Veiculo} from '../../../../shared/models';
import {TipoVeiculo} from '../../../../shared/models/tipoVeiculo.model';
import {PREVTRANS_API} from '../../../../app.api';
import {AcidenteTransitoService} from '../../../../shared/services/acidente-transito.service';

declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'app-cadastro-acidente-de-transito',
  templateUrl: './cadastro-acidente-de-transito.component.html',
  styleUrls: ['./cadastro-acidente-de-transito.component.css']
})
export class CadastroAcidenteDeTransitoComponent implements OnInit {
  cepPattern = /^[0-9]{8}$/;

  acidenteTransitoForm : FormGroup;
  veiculoForm : FormGroup;
  acidenteTransito : AcidenteTransito;
  tiposVeiculos: TipoVeiculo[]=[
    {
      idTipoVeiculo: 1,
      siglaTipoVeiculo: 'A',
      tipoVeiculo: 'AutoMotor'
    },
    {
      idTipoVeiculo: 2,
      siglaTipoVeiculo: 'B',
      tipoVeiculo: 'Automovel'
    }
  ];
  tipoVeiculo: TipoVeiculo;
  veiculos: Veiculo[]=[
    {
      idVeiculo:1,
      fabricante: 'reno',
      marca: 'sandeiro',
      placa: '1234-asd',
      descricao: 'bravo',
      numeroOcupantes: 1,
      tipoVeiculo:{
        idTipoVeiculo: 1,
        siglaTipoVeiculo: 'A',
        tipoVeiculo: 'AutoMotor'
      }
    }
  ];
  veiculo : Veiculo;
  constructor(private formBuilder: FormBuilder, private router: Router, private acidenteTransitoService: AcidenteTransitoService) { }

  lat:  number=  -27.900756;
  lng:  number=  -50.756954;
  zoom= 15;

  ngOnInit() {
    this.veiculo= new Veiculo();
    this.tipoVeiculo= new TipoVeiculo();
    this.acidenteTransito= new AcidenteTransito();
    this.validaForm();
    this.inicializaMaterialize();
    this.inicializaModal();
    this.inilializaTime();
    this.inicializaSelect();
  }
  salvar(acidenteTransito: AcidenteTransito){

  }
  cancelar(){
    this.router.navigate(['admin/acidentes-de-transitos']);
  }

  validaForm(){
    this.acidenteTransitoForm = this.formBuilder.group(
      {
        tituloPublicacao: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        data: this.formBuilder.control('',[Validators.required]),
        hora: this.formBuilder.control('',[Validators.required]),
        descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(1000)]),
        latitude: this.formBuilder.control('',[Validators.required]),
        longitude: this.formBuilder.control('',[Validators.required]),
        cep: this.formBuilder.control('', [Validators.required, Validators.pattern(this.cepPattern)]),
        endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
        complemento: this.formBuilder.control(''),
        bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        estado: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
        cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        quantidadeVitimas: this.formBuilder.control('', [Validators.required])
      }
    );
    this.veiculoForm = this.formBuilder.group(
      {
        tipoVeiculo: [''],
        fabricante : this.formBuilder.control('',[Validators.required]),
        marca : this.formBuilder.control('', [Validators.required]),
        placa : this.formBuilder.control('', [Validators.required]),
        descricao : this.formBuilder.control('', [Validators.required]),
        numeroOcupantes : this.formBuilder.control('', [ Validators.required])
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
      jQuery('.modal').modal({
        dismissible : false
        }
      );
    });
  }
  inilializaTime(){
    jQuery('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Limpar', // text for clear-button
      canceltext: 'Cancelar', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: false, // make AM PM clickable
      aftershow: function(){} //Function for after opening timepicker
    });
  }
  inicializaSelect(){
    jQuery(document).ready(function() {
      jQuery('select').material_select();
    });

  }
  buscaLatitudeLongitude() {
    jQuery('#modal-busca').modal('open');
  }
  abreModalVeiculo(){
    jQuery('#modal-veiculo').modal('open');
  }
  fechaModalVeiculo(){
    jQuery('#modal-veiculo').modal('close');
    this.veiculoForm.reset();
  }
  adicionaVeiculo(veiculo: Veiculo){
    this.veiculo= veiculo;
    console.log(this.veiculo);
    console.log(this.veiculoForm.get('tipoVeiculo').value);
    this.veiculo.tipoVeiculo = this.veiculoForm.get('tipoVeiculo').value
    console.log(this.veiculo.tipoVeiculo);
  //  this.veiculos = this.veiculos.concat(this.veiculo);Tracks
  }
  imageUploaded(event){
   this.acidenteTransitoService.uploadImagem(event).then(
     () => {
      alert('upload realizado com sucesso!');
     }
   )
     .catch(erro => {
      console.log(erro);
     });
  }

  imageRemoved(event){
    console.log(event);
  }
  disableSendButton(event){

  }
}

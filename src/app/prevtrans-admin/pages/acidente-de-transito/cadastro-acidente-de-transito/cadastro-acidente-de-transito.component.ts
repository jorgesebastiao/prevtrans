import {Component, EventEmitter, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgmMap} from '@agm/core';
import {MaterializeAction} from 'angular2-materialize';
import {
  AcidenteTransitoService,
  GoogleMapsService,
  TipoVeiculoService
} from '../../../../shared/services';
import {
  AcidenteTransito,
  Localizacao,
  TipoVeiculo,
  Veiculo,
  UrlFotos
} from '../../../../shared/models';


declare const jQuery: any;
declare const Materialize: any;
var pgwSlideshow;

@Component({
  selector: 'app-cadastro-acidente-de-transito',
  templateUrl: './cadastro-acidente-de-transito.component.html',
  styleUrls: ['./cadastro-acidente-de-transito.component.css']
})
export class CadastroAcidenteDeTransitoComponent implements OnInit {

  lat: number = -27.900756;
  lng: number = -50.756954;
  zoom = 15;
  cepPattern = /^[0-9]{8}$/;
  localizacao: Localizacao;
  acidenteTransitoForm: FormGroup;
  veiculoForm: FormGroup;
  acidenteTransito: AcidenteTransito;
  veiculos: Veiculo[];
  urlFotos: UrlFotos[];
  veiculo: Veiculo;
  tiposVeiculos: TipoVeiculo[];
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private acidenteTransitoService: AcidenteTransitoService,
              private googleMapsService: GoogleMapsService,
              private tipoVeiculoService: TipoVeiculoService) {
  }

  ngOnInit() {
    this.urlFotos = [];
    for (let i = 1; i <= 3; i++) {
      this.urlFotos.push({
        url: 'https://lorempixel.com/800/400/food/1',
        titulo: 'Description for Image ' + i,
        idUrl: 'Title ' + i
      });
    }
    console.log(this.urlFotos);
    this.veiculo = new Veiculo();
    this.veiculos = [];
    this.acidenteTransito = new AcidenteTransito();
    this.acidenteTransito.urlFotos = [];
    this.localizacao = new Localizacao();
    this.validaForm();
    this.inicializaToolTipe();
    this.inicializaMaterialize();
    this.listaTiposVeiculos();
    this.inicializaPsw();
    const id = this.activeRoute.snapshot.params['id'];
    if (id) {
      this.carregarAcidenteTransito(id);
    }
  }


  validaForm() {
    this.acidenteTransitoForm = this.formBuilder.group(
      {
        tituloPublicacao: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        data: this.formBuilder.control('', [Validators.required]),
        hora: this.formBuilder.control('', [Validators.required]),
        descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(1000)]),
        latitude: this.formBuilder.control('', [Validators.required]),
        longitude: this.formBuilder.control('', [Validators.required]),
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
        tipoVeiculo: [[''], Validators.required],
        fabricante: this.formBuilder.control('', [Validators.required]),
        marca: this.formBuilder.control('', [Validators.required]),
        placa: this.formBuilder.control('', [Validators.required]),
        descricao: this.formBuilder.control('', [Validators.required]),
        numeroOcupantes: this.formBuilder.control('', [Validators.required])
      }
    );
  }

  @ViewChild(AgmMap) private myMap: any;

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    this.redrawMap();
  }

  private redrawMap() {
    this.myMap.triggerResize()
      .then(() => this.myMap._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
  }

  selectMap() {
    console.log('erros rend map');
    this.redrawMap();
  }

  mapClicked(event) {
    this.googleMapsService.localizacaoAcidente(event.coords.lat, event.coords.lng)
      .subscribe(
        localizacao => {
          this.lat = localizacao.latitude;
          this.lng = localizacao.longitude;
          this.localizacao = localizacao;
        }
      );
  }

  fechaMapaBusca() {
    jQuery('#modal-busca').modal('close');
  }

  adicionaLocalizacao() {
    this.acidenteTransitoForm.patchValue(this.localizacao);
    jQuery('#modal-busca').modal('close');
    this.inicializaMaterialize();
  }

  buscaLatitudeLongitude() {
    this.selectMap();
    jQuery('#modal-busca').modal('open');
  }

  openModal() {
    this.selectMap();
    this.modalActions.emit({action: 'modal', params: ['open']});
    this.selectMap();
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  get editando() {
    return Boolean(this.acidenteTransito.idAcidenteTransito);
  }

  carregarAcidenteTransito(id: string) {
    this.acidenteTransitoService.getAcidenteTransito(id)
      .subscribe(acidenteTransito => {
        if (acidenteTransito) {
          this.acidenteTransito = acidenteTransito;
          this.acidenteTransitoForm.patchValue(this.acidenteTransito);
          this.inicializaMaterialize();
        } else {
          this.addToast();
          this.router.navigate(['/admin/acidentes-de-transitos']);
        }
      });
  }

  salvar(acidenteTransito: AcidenteTransito) {
    if (this.editando) {
    } else {
    }
  }

  cadastrarAcidenteTransito(acidenteTransito: AcidenteTransito) {
    this.acidenteTransitoService.postAcidenteDeTransito(acidenteTransito)
      .subscribe(() => {
        this.acidenteTransitoForm.patchValue(acidenteTransito);
        this.veiculos = new Array(this.acidenteTransito.veiculos);
        this.router.navigate(['/admin/acidentes-de-transitos']);
      });
  }

  alterarAcidenteTransito(acidenteTransito: AcidenteTransito) {
    acidenteTransito.idAcidenteTransito = this.acidenteTransito.idAcidenteTransito;
    this.acidenteTransitoService.putAcidenteDeTransito(this.acidenteTransito.idAcidenteTransito, acidenteTransito)
      .subscribe(acidenteTransito => {
        this.acidenteTransitoForm.patchValue(acidenteTransito);
        this.veiculos = new Array(this.acidenteTransito.veiculos);
        this.router.navigate(['/admin/acidentes-de-transitos']);
      });
  }

  cancelar() {
    this.router.navigate(['admin/acidentes-de-transitos']);
  }

  inicializaMaterialize() {
    jQuery(document).ready(function () {
      Materialize.updateTextFields();
    });
  }

  inicializaModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal({
          dismissible: false
        }
      );
    });
  }

  inilializaTime() {
    jQuery('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Limpar', // text for clear-button
      canceltext: 'Cancelar', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: false, // make AM PM clickable
      aftershow: function () {
      } // Function for after opening timepicker
    });
  }

  inicializaMaterialBox() {
    jQuery(document).ready(function () {
      jQuery('.materialboxed').materialbox();
    });
  }

  listaTiposVeiculos() {
    this.tipoVeiculoService.tiposVeiculos().subscribe(tiposVeiculos => {
      if (tiposVeiculos) {
        this.tiposVeiculos = tiposVeiculos;
      }
    });
  }

  abreModalVeiculo() {
    jQuery('#modal-veiculo').modal('open');
  }

  fechaModalVeiculo() {
    jQuery('#modal-veiculo').modal('close');
    this.veiculoForm.reset();
  }

  adicionaVeiculo(veiculo: Veiculo) {
    this.veiculo = veiculo;
    this.veiculo.tipoVeiculo = this.veiculoForm.get('tipoVeiculo').value;
    console.log(this.veiculo);
    console.log(this.veiculos);
    this.veiculos.push(this.veiculo);
  }

  imageUploaded(event) {
    const formData: FormData = new FormData();
    formData.append('file', event.file);
    this.acidenteTransitoService.upload(formData).subscribe(url => {
      this.urlFotos.push(url);
      console.log(url);
      this.reloadPsw();
    });
  }

  imageRemoved(event) {
    console.log(event);
  }

  disableSendButton(event) {

  }

  addToast() {
    console.log('ng2 toasty');
  }

  inicializaToolTipe() {
    jQuery(document).ready(function () {
      jQuery('.tooltipped').tooltip({delay: 50});
    });
  }

  inicializaPsw() {
    jQuery(document).ready(function () {
      pgwSlideshow = jQuery('.pgwSlideshow').pgwSlideshow();
    });
  }

  reloadPsw() {
    jQuery(document).ready(function () {
      pgwSlideshow.reload();
    });
  }
}

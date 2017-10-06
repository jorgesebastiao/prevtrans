import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  FormGroup, FormBuilder, Validators, AbstractControl, FormControl
} from '@angular/forms';
import {AcidenteTransito, Veiculo} from '../../../../shared/models';
import {TipoVeiculo} from '../../../../shared/models/tipoVeiculo.model';
import {AcidenteTransitoService} from '../../../../shared/services/acidente-transito.service';
import {GoogleMapsService} from '../../../../shared/services/google-maps.service';
import {Localizacao} from '../../../../shared/models/localizacao.model';
import {AgmMap} from '@agm/core';
import {ToastyService} from "ng2-toasty";
import {TipoVeiculoService} from "../../../../shared/services/tipo-veiculo.service";

declare const jQuery: any;
declare const Materialize: any;

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
  veiculos: Array<Veiculo> = new Array<Veiculo>();
  veiculo: Veiculo;
  tiposVeiculos: TipoVeiculo[];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private routes: ActivatedRoute,
              private toastyService: ToastyService,
              private acidenteTransitoService: AcidenteTransitoService,
              private googleMapsService: GoogleMapsService,
              private tipoVeiculoService: TipoVeiculoService) {
  }

  ngOnInit() {
    this.veiculo = new Veiculo();
    this.acidenteTransito = new AcidenteTransito();
    this.acidenteTransito.urlFotos= new Array<String>();
    this.localizacao = new Localizacao();
    this.validaForm();
    this.inicializaMaterialize();
    this.inicializaModal();
    this.inilializaTime();
    this.inicializaMaterialBox();
    this.listaTiposVeiculos();
    const id = this.routes.snapshot.params['id'];
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

  private selectMap() {
    this.redrawMap();
  }

  mapClicked(event) {
    this.googleMapsService.localizacaoAcidente(event.coords.lat, event.coords.lng)
      .subscribe(
        localizacao => {
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
    acidenteTransito.idAcidenteTransito=this.acidenteTransito.idAcidenteTransito;
    this.acidenteTransitoService.putAcidenteDeTransito(acidenteTransito)
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
      } //Function for after opening timepicker
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

  /*
    byIdTipoVeiculo(item1: TipoVeiculo, item2: TipoVeiculo) {
      return item1.idTipoVeiculo === item2.idTipoVeiculo;
    }*/

  imageUploaded(event) {
    const formData: FormData = new FormData();
    formData.append('file', event.file);
    this.acidenteTransitoService.upload(formData).subscribe(url => {
      console.log(url);
    this.acidenteTransito.urlFotos.push(url);
    console.log(this.acidenteTransito.urlFotos);
    });
  }

  imageRemoved(event) {
    console.log(event);
  }

  disableSendButton(event) {

  }

  addToast() {
    this.toastyService.success({
      title: 'Alteração realizada com sucesso!',
      showClose: true,
      timeout: 10000000,
      theme: 'default'
    });
  }
}

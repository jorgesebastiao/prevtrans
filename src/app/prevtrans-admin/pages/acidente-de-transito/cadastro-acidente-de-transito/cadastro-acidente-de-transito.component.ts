import {Component, EventEmitter, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgmMap} from '@agm/core';
import {MaterializeAction} from 'angular2-materialize';
import {
  AcidenteTransitoService,
  ClimaService,
  GoogleMapsService,
  PeriodoDiaService,
  PistaService,
  SinalizacaoService,
  TipoAcidenteTransitoService,
  TipoVeiculoService,
  ViaService,
  VisibilidadeService
} from '../../../../shared/services';
import {
  AcidenteTransito,
  Clima,
  CondicaoDaVia,
  Localizacao,
  PeriodoDia,
  Pista,
  Sinalizacao,
  TipoAcidenteTransito,
  TipoVeiculo,
  TipoVia,
  UrlFotos,
  Veiculo,
  Visibilidade
} from '../../../../shared/models';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../../../shared/seguranca/auth.service';

declare const jQuery: any;
declare const Materialize: any;

@Component({
  selector: 'app-cadastro-acidente-de-transito',
  templateUrl: './cadastro-acidente-de-transito.component.html',
  styleUrls: ['./cadastro-acidente-de-transito.component.css']
})
export class CadastroAcidenteDeTransitoComponent implements OnInit {
  titulo = 'Cadastrar Acidente de Trânsito';
  lat: number = -27.900756;
  lng: number = -50.756954;
  zoom = 15;
  cepPattern = /^[0-9]{8}$/;
  numberPattern = /^[0-9]*$/;
  localizacao: Localizacao;
  acidenteTransitoForm: FormGroup;
  veiculoForm: FormGroup;
  acidenteTransito: AcidenteTransito;
  veiculo: Veiculo;
  condicoesDasVias: CondicaoDaVia[];
  tiposVias: TipoVia[];
  visibilidades: Visibilidade[];
  climas: Clima[];
  pistas: Pista[];
  periodosDias: PeriodoDia[];
  sinalizacoes: Sinalizacao[];
  tiposAcidentesTransitio: TipoAcidenteTransito[];

  veiculos: Veiculo[];
  urlFotos: UrlFotos[];
  tiposVeiculos: TipoVeiculo[];
  modalVeiculoActions = new EventEmitter<string | MaterializeAction>();
  confirma: boolean;
  data: any;
  hora: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private acidenteTransitoService: AcidenteTransitoService,
              private googleMapsService: GoogleMapsService,
              private tipoVeiculoService: TipoVeiculoService,
              private viaService: ViaService,
              private toastyService: ToastyService,
              private tipoAcidenteTransitoService: TipoAcidenteTransitoService,
              private pistaService: PistaService,
              private sinalizacaoService: SinalizacaoService,
              private visibilidadeService: VisibilidadeService,
              private periodoDiaService: PeriodoDiaService,
              private climaService: ClimaService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.urlFotos = [];
    this.condicoesDasVias = [];
    this.tiposVias = [];
    this.visibilidades = [];
    this.climas = [];
    this.pistas = [];
    this.periodosDias = [];
    this.sinalizacoes = [];
    this.tiposAcidentesTransitio = [];
    this.veiculo = new Veiculo();
    this.veiculos = [];
    this.acidenteTransito = new AcidenteTransito();
    this.acidenteTransito.urlFotos = [];
    this.localizacao = new Localizacao();
    this.inicializaCalendario();
    this.validaForm();
    this.inicializaMaterialize();
    this.listaTiposVeiculos();
    this.listaCondicoesDasVias();
    this.listaTiposVias();
    this.listaVisibilidades();
    this.listaClimas();
    this.listaPistas();
    this.listaPeriodosDias();
    this.listaSinalizacoes();
    this.listaTiposAcidentesTransito();
    const id = this.activeRoute.snapshot.params['id'];
    if (id) {
      this.titulo = 'Alterar Acidente de Trânsito';
      this.carregarAcidenteTransito(id);
    }
  }

  inicializaCalendario() {
    this.data = {
      format: 'dd/mm/yyyy',
      selectYears: 3,
      selectMonths: true,
      monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
        'Novembro', 'Dezembro'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      weekdaysShort: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
      showMonthsShort: false,
      showWeekdaysFull: false,
      editable: false,
      firstDay: 0,
      max: true,
      today: 'Hoje',
      clear: 'limpar',
      close: 'Ok',
      closeOnSelect: false
    };

    this.hora = {
      default: 'now',
      fromnow: 0,
      twelvehour: false,
      donetext: 'OK',
      cleartext: 'Limpar',
      canceltext: 'Cancelar',
      autoclose: false,
      ampmclickable: false,
      max: true,
      interval: 0
    };
  }

  validaForm() {
    this.acidenteTransitoForm = this.formBuilder.group(
      {
        tituloPublicacao: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        data: this.formBuilder.control(''),
        hora: this.formBuilder.control(''),
        descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(250)]),
        numeroDeMortos: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
        numeroDeFeridos: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
        numeroDeVitimas: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
        condicaoDaVia: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        tipoVia: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        visibilidade: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        sinalizacao: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        clima: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        periodoDia: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        tipoAcidenteTransito: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        pista: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        latitude: this.formBuilder.control('', [Validators.required]),
        longitude: this.formBuilder.control('', [Validators.required]),
        cep: this.formBuilder.control('', [Validators.required, Validators.pattern(this.cepPattern)]),
        endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
        complemento: this.formBuilder.control(''),
        bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        estado: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
        cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        numeroVeiculosEnvolvidos: this.formBuilder.control('', [Validators.required, Validators.minLength(3)])

      }
    );
    this.veiculoForm = this.formBuilder.group(
      {
        tipoVeiculo: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
        fabricante: this.formBuilder.control('', [Validators.required]),
        marca: this.formBuilder.control('', [Validators.required]),
        placa: this.formBuilder.control('', [Validators.required]),
        descricao: this.formBuilder.control('', [Validators.required]),
        numeroOcupantes: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)])
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
    this.lat = this.localizacao.latitude;
    this.lng = this.localizacao.longitude;
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
          for (let i = 0; i < this.pistas.length; i++) {
            if (this.pistas[i].idPista === acidenteTransito.pista.idPista) {
              this.pistas[i] = acidenteTransito.pista;
            }
          }
          for (let i = 0; i < this.tiposVias.length; i++) {
            if (this.tiposVias[i].idTipoVia === acidenteTransito.tipoVia.idTipoVia) {
              this.tiposVias[i] = acidenteTransito.tipoVia;
            }
          }
          for (let i = 0; i < this.sinalizacoes.length; i++) {
            if (this.sinalizacoes[i].idSinalizacao === acidenteTransito.sinalizacao.idSinalizacao) {
              this.sinalizacoes[i] = acidenteTransito.sinalizacao;
            }
          }
          for (let i = 0; i < this.tiposAcidentesTransitio.length; i++) {
            if (this.tiposAcidentesTransitio[i].idTipoAcidenteTransito === acidenteTransito.tipoAcidenteTransito.idTipoAcidenteTransito) {
              this.tiposAcidentesTransitio[i] = acidenteTransito.tipoAcidenteTransito;
            }
          }
          for (let i = 0; i < this.climas.length; i++) {
            if (this.climas[i].idClima === acidenteTransito.clima.idClima) {
              this.climas[i] = acidenteTransito.clima;
            }
          }
          for (let i = 0; i < this.visibilidades.length; i++) {
            if (this.visibilidades[i].idVisibilidade === acidenteTransito.visibilidade.idVisibilidade) {
              this.visibilidades[i] = acidenteTransito.visibilidade;
            }
          }
          for (let i = 0; i < this.condicoesDasVias.length; i++) {
            if (this.condicoesDasVias[i].idCondicaoDaVia === acidenteTransito.condicaoDaVia.idCondicaoDaVia) {
              this.condicoesDasVias[i] = acidenteTransito.condicaoDaVia;
            }
          }
          for (let i = 0; i < this.periodosDias.length; i++) {
            if (this.periodosDias[i].idPeiodoDia === acidenteTransito.periodoDia.idPeiodoDia) {
              this.periodosDias[i] = acidenteTransito.periodoDia;
            }
          }
          this.veiculos = acidenteTransito.veiculos;
          this.lat = acidenteTransito.latitude;
          this.lng = acidenteTransito.longitude;
          this.localizacao.latitude = acidenteTransito.latitude;
          this.localizacao.longitude = acidenteTransito.longitude;
          this.somaVitimas;
          this.inicializaMaterialize();
        } else {
          this.router.navigate(['/admin/acidentes-de-transitos']).then(
            () => this.toastyService.error('Acidente de Trânsito não encontrado!!')
          );
        }
      });
  }

  get somaVitimas() {
    let soma = function (valor1: number, valor2: number) {
      return valor1 + valor2;
    }
    const numeroFeridos: number = parseInt(this.acidenteTransitoForm.controls['numeroDeFeridos'].value, 10);
    const numeroMortos: number = parseInt(this.acidenteTransitoForm.controls['numeroDeMortos'].value, 10);
    if (numeroFeridos && numeroMortos) {
      const numeroDeVitimas = soma(numeroFeridos, numeroMortos);
      this.acidenteTransitoForm.controls['numeroDeVitimas'].patchValue(numeroDeVitimas);
      this.acidenteTransitoForm.controls['numeroDeVitimas'].disable({onlySelf: true});
      this.inicializaMaterialize();
      return true;
    }
    return false;
  }

  salvar(acidenteTransito: AcidenteTransito) {
    this.confirma = true;
    if (this.editando) {
      this.alterarAcidenteTransito(acidenteTransito);
    } else {
      acidenteTransito.veiculos = this.veiculos;
      this.cadastrarAcidenteTransito(acidenteTransito);
    }
  }

  cadastrarAcidenteTransito(acidenteTransito: AcidenteTransito) {
    this.acidenteTransitoService.postAcidenteDeTransito(this.auth.jwtPayload.id_instituicao, acidenteTransito)
      .subscribe(() => {
        this.router.navigate(['/admin/acidentes-de-transitos']).then(
          () => this.confirmacao('Cadastro Realizado com Sucesso!!')
        );
      });
  }

  alterarAcidenteTransito(acidenteTransito: AcidenteTransito) {
    acidenteTransito.idAcidenteTransito = this.acidenteTransito.idAcidenteTransito;
    acidenteTransito.instituicao = this.acidenteTransito.instituicao;
    this.acidenteTransitoService.putAcidenteDeTransito(this.acidenteTransito.idAcidenteTransito, acidenteTransito)
      .subscribe(() => {
        this.router.navigate(['/admin/acidentes-de-transitos']).then(
          () => this.confirmacao('Cadastro Alterado com Sucesso!!')
        );
      });
  }

  cancelar() {
    this.router.navigate(['admin/acidentes-de-transitos']).then(
      () => this.confirmacao('Operação Cancelada!!')
    );
  }

  inicializaMaterialize() {
    jQuery(document).ready(function () {
      Materialize.updateTextFields();
    });
  }

  listaTiposVeiculos() {
    this.tipoVeiculoService.tiposVeiculos().subscribe(tiposVeiculos => {
      if (tiposVeiculos) {
        this.tiposVeiculos = tiposVeiculos;
      }
    });
  }

  listaCondicoesDasVias() {
    this.viaService.condicoesDaVia().subscribe(condicoesDasVias => {
      if (condicoesDasVias) {
        this.condicoesDasVias = condicoesDasVias;
      }
    });
  }

  listaTiposVias() {
    this.viaService.tiposVias().subscribe(
      tiposVias => {
        if (tiposVias) {
          this.tiposVias = tiposVias;
        }
      }
    );
  }

  listaVisibilidades() {
    this.visibilidadeService.visibilidades().subscribe(
      visibilidades => {
        this.visibilidades = visibilidades;
      }
    );
  }

  listaClimas() {
    this.climaService.climas().subscribe(climas => this.climas = climas);
  }

  listaPistas() {
    this.pistaService.pistas().subscribe(pistas => this.pistas = pistas);
  }

  listaPeriodosDias() {
    this.periodoDiaService.periodosDias().subscribe(periodosDias => this.periodosDias = periodosDias);
  }

  listaSinalizacoes() {
    this.sinalizacaoService.sinalizacoes().subscribe(sinalizacoes => this.sinalizacoes = sinalizacoes);
  }

  listaTiposAcidentesTransito() {
    this.tipoAcidenteTransitoService.tiposAcidentesTransito()
      .subscribe(tiposAcidentesTransitio => this.tiposAcidentesTransitio = tiposAcidentesTransitio);
  }

  abreModalVeiculo() {
    this.modalVeiculoActions.emit({action: 'modal', params: ['open']});
  }

  fechaModalVeiculo() {
    this.modalVeiculoActions.emit({action: 'modal', params: ['close']});
    this.veiculoForm.reset();
  }

  adicionaVeiculo(veiculo: Veiculo) {
    this.veiculos.push(veiculo);
    this.fechaModalVeiculo();
  }

  alterarVeiculo(veiculo: Veiculo, idM: number) {
    if (veiculo.idVeiculo) {
      console.log('com id index' + idM);
      console.log(veiculo);
      /*
            let index = this.veiculos.findIndex(p => p.idVeiculo === veiculo.idVeiculo);
            this.veiculos.splice(index, 1);*/
    } else {
      console.log('sem id index' + idM);
      console.log(veiculo);
    }
  }

  removerVeiculo(veiculo: Veiculo, index: number) {
    if (veiculo.idVeiculo) {
    } else {
      this.veiculos.splice(index, 1);
    }
  }

  confirmacao(msg: string) {
    this.toastyService.success({
      title: 'Confirmação!',
      msg: msg,
      showClose: true,
      timeout: 10000,
      theme: 'default'
    });
  }
}

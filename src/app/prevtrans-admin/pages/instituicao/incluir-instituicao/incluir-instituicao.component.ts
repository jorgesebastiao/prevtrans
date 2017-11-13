import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Instituicao, Usuario} from '../../../../shared/models';
import {CepService, InstituicaoService} from '../../../../shared/services';
import {PrevtransCnpjValidator} from '../../../../shared/validators/prevtrans-cnpj-validator';
import {ToastyService} from "ng2-toasty";

declare const jQuery: any;
declare const Materialize: any;

@Component({
  selector: 'app-incluir-instituicao',
  templateUrl: './incluir-instituicao.component.html',
  styleUrls: ['./incluir-instituicao.component.css']
})
export class IncluirInstituicaoComponent implements OnInit {
  titulo = 'Cadastrar Instituição';
  cepPattern = /^[0-9]{8}$/;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  instituicao = new Instituicao();
  instituicaoForm: FormGroup;
  usuarios: Usuario[];
  constructor(private formBuilder: FormBuilder,
              private routes: ActivatedRoute,
              private router: Router,
              private cepService: CepService,
              private instituicaoService: InstituicaoService,
              private toastyService: ToastyService) {
  }

  ngOnInit() {
    this.usuarios = [];
    this.inicializaMaterialize();
    this.inicializaModal();
    this.validaForm();
    const id = this.routes.snapshot.params['id'];
    if (id) {
      this.titulo = 'Alterar Instituição';
      this.carregarInstituicao(id);
    }
  }

  get editando() {
    return Boolean(this.instituicao.idInstituicao);
  }

  confirma() {
    jQuery('#modal-instituicao').modal('open');
  }

  salvar(instituicao: Instituicao) {
    if (this.editando) {
      this.alterarInstituicao(instituicao);
    } else {
      this.salvarInstituicao(instituicao);
    }
  }

  salvarInstituicao(instituicao: Instituicao) {
    this.instituicaoService.postInstituicao(instituicao)
      .subscribe( () => {
          this.router.navigate(['admin/instituicoes']);
          this.confirmacao('Instiuição cadastrada com sucesso!!');
        }
      );
  }

  alterarInstituicao(instituicao: Instituicao) {
    instituicao.idInstituicao = this.instituicao.idInstituicao;
    this.instituicaoService.putInstituicao(this.instituicao.idInstituicao, instituicao)
      .subscribe(() => {
          this.router.navigate(['admin/instituicoes']);
          this.confirmacao('Instiuição alterada com sucesso!!');
        }
      );
  }

  cancelar() {
    this.router.navigate(['admin/instituicoes']);
  }

  carregarInstituicao(id: string) {
    this.instituicaoService.getInstituicao(id)
      .subscribe(instituicao => {
        this.instituicao = instituicao;
        this.instituicaoForm.patchValue(this.instituicao);
        this.inicializaMaterialize();
      });
  }

  consultaCep() {
    let cepBusca = this.instituicaoForm.get('cep').value;
    if (cepBusca && (cepBusca !== this.instituicao.cep)) {
      this.instituicao.cep = cepBusca;
      this.cepService.consultaCep(cepBusca)
        .subscribe(dados => {
          this.instituicaoForm.patchValue({
            endereco: dados.logradouro,
            complemento: dados.complemento,
            bairro: dados.bairro,
            estado: dados.uf,
            cidade: dados.localidade
          });
          this.inicializaMaterialize();
        });
    }
  }

  validaForm() {
    this.instituicaoForm = this.formBuilder.group({
      razaoSocial: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
      nomeFantasia: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      cnpj: this.formBuilder.control('', Validators.compose([
        Validators.required, IncluirInstituicaoComponent.validaCnpj])),
      inscricaoEstadual: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      inscricaoMunicipal: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      celular: this.formBuilder.control(''),
      cep: this.formBuilder.control('', [Validators.required, Validators.pattern(this.cepPattern)]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      numero: this.formBuilder.control(''),
      complemento: this.formBuilder.control(''),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      estado: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)])
    });
  }

  static validaCnpj(control: AbstractControl): { [key: string]: boolean } {
    return PrevtransCnpjValidator.validate(control);
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
  adicionarUsuario() {

  }

  confirmacao(msg: string){
    this.toastyService.success({
      title: 'Confirmação',
      msg: msg,
      showClose: true,
      timeout: 10000,
      theme: 'default'
    });
  }
}

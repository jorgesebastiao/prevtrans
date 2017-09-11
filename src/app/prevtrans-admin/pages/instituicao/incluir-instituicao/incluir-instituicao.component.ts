import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {ToastyService} from 'ng2-toasty';

import {Instituicao} from '../../../../shared/models';
import {CepService, InstituicaoService} from '../../../../shared/services';
import {PrevtransCnpjValidator} from '../../../../shared/validators/prevtrans-cnpj-validator';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-incluir-instituicao',
  templateUrl: './incluir-instituicao.component.html',
  styleUrls: ['./incluir-instituicao.component.css']
})
export class IncluirInstituicaoComponent implements OnInit {
  cepPattern = /^[0-9]{8}$/;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  instituicao = new Instituicao();
  instituicaoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private routes: ActivatedRoute,
              private router: Router,
              private cepService: CepService,
              private instituicaoService: InstituicaoService,
              private toastyService: ToastyService) {
  }

  ngOnInit() {
    this.inicializaMaterialize();
    this.inicializaModal();
    this.validaForm();
    const id = this.routes.snapshot.params['id'];
    if (id) {
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
    console.log(this.instituicaoForm.get('cnpj').value);
    if (this.editando) {
      console.log('alterando');
      this.alterarInstituicao(instituicao);
    } else {
      console.log('salvando');
      this.salvarInstituicao(instituicao);
    }
    this.addToast();
  }

  salvarInstituicao(instituicao: Instituicao) {
    console.log(instituicao);
    this.instituicaoService.postInstituicao(instituicao)
      .subscribe(instituicao => {
          this.router.navigate(['admin/instituicoes']);
          this.instituicaoForm.patchValue(instituicao);
        }
      );
  }

  alterarInstituicao(instituicao: Instituicao) {
    instituicao.idInstituicao = this.instituicao.idInstituicao;
    console.log(instituicao);
    this.instituicaoService.putInstituicao(instituicao)
      .subscribe(instituicao => {
        this.router.navigate(['admin/instituicoes']);
        this.instituicaoForm.patchValue(instituicao);
        }
      );
  }

  cancelar(){
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
    console.log(cepBusca);
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

  addToast() {
    this.toastyService.success({
      title: 'Alteração realizada com sucesso!',
      showClose: true,
      timeout: 10000000,
      theme: 'default'
    });
  }
}

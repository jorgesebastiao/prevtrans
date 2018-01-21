import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import {Instituicao, Usuario} from '../../../../shared/models';
import {CepService, InstituicaoService} from '../../../../shared/services';
import {PrevtransCnpjValidator} from '../../../../shared/validators/prevtrans-cnpj-validator';
import {ToastyService} from 'ng2-toasty';

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
  numberPattern = /^[0-9]*$/;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  confirma: boolean;

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
    this.iniciaForm();
    const id = this.routes.snapshot.params['id'];
    if (id) {
      this.titulo = 'Alterar Instituição';
      this.carregarInstituicao(id);
    }
  }

  get editando() {
    return Boolean(this.instituicao.idInstituicao);
  }

  salvar(instituicao: Instituicao) {
    if (this.instituicaoForm.valid) {
      this.confirma = true;
      if (this.editando) {
        this.alterarInstituicao(instituicao);
      } else {
        this.salvarInstituicao(instituicao);
      }
    } else {
      this.validaForm(this.instituicaoForm);
    }
  }

  salvarInstituicao(instituicao: Instituicao) {
    this.instituicaoService.postInstituicao(instituicao)
      .subscribe(() => {
          this.router.navigate(['admin/instituicoes']).then(
            () => this.confirmacao('Instiuição cadastrada com sucesso!!')
          );
        }
      );
  }

  alterarInstituicao(instituicao: Instituicao) {
    instituicao.idInstituicao = this.instituicao.idInstituicao;
    this.instituicaoService.putInstituicao(this.instituicao.idInstituicao, instituicao)
      .subscribe(() => {
          this.router.navigate(['admin/instituicoes']).then(
            () => this.confirmacao('Instiuição alterada com sucesso!!')
          );
        }
      );
  }

  cancelar() {
    this.router.navigate(['admin/instituicoes']).then(
      () => this.confirmacao('Operação Cancelada!!')
    );
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
    const cepBusca = this.instituicaoForm.get('cep').value;
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

  iniciaForm() {
    this.instituicaoForm = this.formBuilder.group({
      razaoSocial: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
      nomeFantasia: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      cnpj: this.formBuilder.control('', [Validators.required, IncluirInstituicaoComponent.validaCnpj], this.cnpjEmUso.bind(this)),
      inscricaoEstadual: this.formBuilder.control(''),
      inscricaoMunicipal: this.formBuilder.control(''),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)],
        this.emailEmUso.bind(this)),
      telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      celular: this.formBuilder.control('',[Validators.required]),
      cep: this.formBuilder.control('', [Validators.required, Validators.pattern(this.cepPattern)]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      numero: this.formBuilder.control('', [Validators.pattern(this.numberPattern)]),
      complemento: this.formBuilder.control(''),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      estado: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)])
    });
  }

  static validaCnpj(control: AbstractControl): { [p: string]: boolean } {
    return PrevtransCnpjValidator.validate(control);
  }
  cnpjEmUso(control: AbstractControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.instituicaoService.verificaCnpj(control.value, this.instituicao.idInstituicao)
          .subscribe(() => {
            resolve(null);
          }, () => {
            resolve({'cnpjEmUso': true});
          });
      }, 1000);
    });
    return q;
  }

  emailEmUso(control: AbstractControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.instituicaoService.verificaEmail(control.value, this.instituicao.idInstituicao)
          .subscribe(() => {
            resolve(null);
          }, () => {
            resolve({'emailEmUso': true});
          });
      }, 1000);
    });
    return q;
  }


  validaForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validaForm(control);
      }
    });
  }

  inicializaMaterialize() {
    jQuery(document).ready(function () {
      Materialize.updateTextFields();
    });
  }

  confirmacao(msg: string) {
    this.toastyService.success({
      title: 'Confirmação',
      msg: msg,
      showClose: true,
      timeout: 10000,
      theme: 'default'
    });
  }
}

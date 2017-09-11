import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pessoa, Usuario} from '../../../../shared/models';
import {CepService, PessoaService, UsuarioService} from '../../../../shared/services';
import {PrevtransCpfValidator} from '../../../../shared/validators/prevtrans-cpf-validator';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  cepPattern = /^[0-9]{8}$/;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  pessoa = new Pessoa();
  usuarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private routes: ActivatedRoute,
              private cepService: CepService,
              private pessoaService: PessoaService,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.inicializaDataPick();
    this.inicializaMaterialize();
    this.validaForm();
    const id = this.routes.snapshot.params['id'];
    if (id) {
      this.carregarUsuario(id);
    }
  }

  get editando() {
    return Boolean(this.pessoa.usuario.idUsuario);
  }

  salvar(pessoa: Pessoa) {
    if (this.editando) {
      this.alterarUsuario(pessoa);
    } else {
      this.salvarUsuario(pessoa);
    }
  }

  salvarUsuario(pessoa: Pessoa) {

  }

  alterarUsuario(pessoa: Pessoa) {

  }

  carregarUsuario(id: string) {
    this.inicializaMaterialize();
  }

  consultaCep() {
    let cepBusca = this.usuarioForm.get('cep').value;
    console.log(cepBusca);
    if (cepBusca && (cepBusca !== this.pessoa.cep)) {
      this.pessoa.cep = cepBusca;
      this.cepService.consultaCep(cepBusca)
        .subscribe(dados => {
          this.usuarioForm.patchValue({
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
    this.usuarioForm = this.formBuilder.group({
      cpf: this.formBuilder.control(null, [Validators.required,  Validators.compose([
        Validators.required, CadastroUsuarioComponent.validaCpf])]),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      dataNascimento: this.formBuilder.control(null, [Validators.required, Validators.minLength(1)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      celular: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      cep: this.formBuilder.control('', [Validators.required, Validators.pattern(this.cepPattern)]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      numero: this.formBuilder.control(''),
      complemento: this.formBuilder.control(''),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      estado: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      usuario: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      senha: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      confirmaSenha: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    });
  }

  static validaCpf(control: AbstractControl): {[key: string]: boolean} {
    return PrevtransCpfValidator.validate(control);
  }

  inicializaMaterialize() {
    jQuery(document).ready(function () {
      Materialize.updateTextFields();
    });
  }

  inicializaDataPick() {
    jQuery(document).ready(function () {
      jQuery('.datepicker').pickadate({
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        today: '',
        clear: 'Limpar',
        close: 'Pronto',
        labelMonthNext: 'Próximo mês',
        labelMonthPrev: 'Mês anterior',
        labelMonthSelect: 'Selecione um mês',
        labelYearSelect: 'Selecione um ano',
        selectMonths: true,
        selectYears: 15,
        format: 'dd/mm/yyyy'
      });
    });
  }
}

import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario, UsuarioPermissao} from '../../../../shared/models';
import {UsuarioService} from '../../../../shared/services';
import {AuthService} from '../../../../shared/seguranca/auth.service';
import {ToastyService} from 'ng2-toasty';
import {Instituicao} from '../../../../shared/models/instituicao.model';
import {InstituicaoService} from '../../../../shared/services/instituicao.service';
import {Observable} from "rxjs/Observable";


declare const jQuery: any;
declare const Materialize: any;

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  titulo: string;
  LOGIN_REGEX = /^[_'.@A-Za-z0-9-]*$/;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  usuarioForm: FormGroup;
  usuario: Usuario;
  messageErroUsuario: string;
  messageErroEmail: string;
  permissoes: UsuarioPermissao[];
  instituicoes: Instituicao[];

  constructor(private formBuilder: FormBuilder,
              private routes: ActivatedRoute,
              private router: Router,
              @Inject(forwardRef(() => UsuarioService)) private usuarioService: UsuarioService,
              public auth: AuthService,
              private toastyService: ToastyService,
              private instituicaoService: InstituicaoService) {
    this.permissoes = [];
    this.carregarPermissoes();
    this.instituicoes = [];
    this.carregarInstituicoes();
  }

  ngOnInit() {
    this.iniciaForm();
    this.carregarInstituicaoUsuario();
    this.inicializaMaterialize();
    this.usuario = new Usuario();
    this.messageErroUsuario = '';
    this.messageErroEmail= '' ;
    const id = this.routes.snapshot.params['id'];
    if (id) {
      this.titulo = 'Alterar Usuário';
      this.carregarUsuario(id);
    } else {
      this.titulo = 'Cadastrar Usuário';
    }
  }

  carregarPermissoes() {
    this.usuarioService.permissoes().subscribe(
      permissoes => {
        this.permissoes = permissoes;
      }
    );
  }

  carregarInstituicoes() {
    this.instituicaoService.instituicoes()
      .subscribe(instituicoes => {
          this.instituicoes = instituicoes;
        }
      );
  }

  carregarInstituicaoUsuario() {
    if (this.auth.jwtPayload.id_instituicao !== 'PREVTRANS_ADMINISTRACAO') {
      this.instituicaoService.getInstituicao(this.auth.jwtPayload.id_instituicao)
        .subscribe(instituicao => {
          this.usuarioForm.patchValue({
            instituicao: instituicao
          });
          for (let i = 0; i < this.instituicoes.length; i++) {
            if (this.instituicoes[i].idInstituicao === instituicao.idInstituicao) {
              this.instituicoes[i] = instituicao;
              this.inicializaMaterialize();
            }
          }
          this.inicializaMaterialize();
        });
    }
  }

  iniciaForm() {
    this.usuarioForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]),
        this.verificaEmail.bind(this)),
      usuario: this.formBuilder.control('', [Validators.required, Validators.minLength(3),
        Validators.pattern(this.LOGIN_REGEX)], this.validaUsuario.bind(this)),
      instituicao: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      usuarioPermissoes: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      ativo: ['true']
    });
  }

  validaUsuario(control: AbstractControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.usuarioService.verificaUsuario(control.value, this.usuario.idUsuario)
          .subscribe(() => {
            this.messageErroUsuario = 'Usuário inválido';
            resolve(null);
          }, () => {
            this.messageErroUsuario = 'Usuário já está em uso';
            resolve({'usuarioEmUso': true});
          });
      }, 1000);
    });
    return q;
  }

  verificaEmail(control: AbstractControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.usuarioService.verificaEmail(control.value, this.usuario.idUsuario)
          .subscribe(() => {
            this.messageErroEmail = 'E-mail inválido';
            resolve(null);
          }, () => {
            this.messageErroEmail = 'E-mail  já está em uso';
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

  get editando() {
    return Boolean(this.usuario.idUsuario);
  }

  carregarUsuario(id: string) {
    console.log('carregando usuarios');
    this.usuarioService.getUsuario(id).subscribe(usuario => {
      this.usuario = usuario;
      this.usuarioForm.patchValue(usuario);
      console.log(this.permissoes);
      for (let i = 0; i < this.permissoes.length; i++) {
        for (let j = 0; j < usuario.usuarioPermissoes.length; j++) {
          if (this.permissoes[i].permissao === usuario.usuarioPermissoes[j].permissao) {
            this.permissoes[i] = usuario.usuarioPermissoes[j];
            this.inicializaMaterialize();
          }
        }
      }
      console.log(this);
      this.inicializaMaterialize();
      for (let i = 0; i < this.instituicoes.length; i++) {
        if (this.instituicoes[i].idInstituicao === usuario.instituicao.idInstituicao) {
          this.instituicoes[i] = usuario.instituicao;
          this.inicializaMaterialize();
        }
      }
      this.inicializaMaterialize();
    });
  }

  salvar(usuario: Usuario) {
    if (this.usuarioForm.valid) {
      if (this.editando) {
        this.alterarUsuario(usuario);
      } else {
        this.cadastrarUsuario(usuario);
      }
    } else {
      this.validaForm(this.usuarioForm);
    }
  }

  alterarUsuario(usuario: Usuario) {
    console.log('alterando');
    usuario.idUsuario = this.usuario.idUsuario;
    this.usuarioService.putUsuario(this.usuario.idUsuario, usuario).subscribe(() => {
      this.router.navigate(['admin/usuarios']).then(
        () => this.confirmacao('Usuário Alterado com Sucesso!!')
      );
    });
  }

  cadastrarUsuario(usuario: Usuario) {
    this.usuarioService.postUsuario(usuario).subscribe(
      () => {
        this.router.navigate(['admin/usuarios']).then(
          () => this.confirmacao('Usuário Cadastrado com Sucesso!!')
        );
      }
    );
  }

  cancelar() {
    this.usuarioForm.reset();
    this.router.navigate(['admin/usuarios']).then(
      () => this.confirmacao('Operação Cancelada!!')
    );
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

  get instituicao() {
    return this.auth.jwtPayload.id_instituicao !== 'PREVTRANS_ADMINISTRACAO';
  }

}

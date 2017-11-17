import {Component, EventEmitter, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../../shared/models/usuario.model';
import {AuthService} from '../../../shared/seguranca/auth.service';
import {MaterializeAction} from 'angular2-materialize';
import {UsuarioService} from '../../../shared/services/usuario.service';
import {Router} from '@angular/router';
import {ToastyService} from 'ng2-toasty';

declare const jQuery: any;
declare const Materialize: any;

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  titulo: string;
  LOGIN_REGEX = /^[_'.@A-Za-z0-9-]*$/;
  EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  perfilUsuarioForm: FormGroup;
  senhaForm: FormGroup;
  alteraSenhaAction = new EventEmitter<string | MaterializeAction>();

  constructor(private formBuilder: FormBuilder, private  auth: AuthService,
              private usuarioService: UsuarioService,
              private router: Router,
              private toastyService: ToastyService) {
  }

  ngOnInit() {
    this.titulo = 'Perfil Usuário';
    this.inicializaMaterialize();
    this.validaForm();
    this.carregarPerfil();
  }

  validaForm() {
    this.perfilUsuarioForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      usuario: this.formBuilder.control('', Validators.compose([Validators.required,
         Validators.pattern(this.LOGIN_REGEX)])),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.EMAIL_REGEX)])
    });

    this.senhaForm = this.formBuilder.group({
      senha: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      verificaSenha: this.formBuilder.control('', [Validators.required, Validators.minLength(8)])
    }, {validator: PerfilUsuarioComponent.equalsTo});
  }
  /*
   validaLogin(control: AbstractControl): { [key: string]: boolean } {
   // return this.autturlogin.validate(control);
  }*/

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const senha = group.get('senha');
    const verificaSenha = group.get('verificaSenha');
    if (!senha || !verificaSenha) {
      return undefined;
    }
    if (senha.value !== verificaSenha.value) {
      return {senhaNotMatch: true}}
    return undefined;
  }

  carregarPerfil() {
    this.usuarioService.getUsuario(this.auth.jwtPayload.idUsuario).subscribe(
      usuario => {
        this.perfilUsuarioForm.patchValue(usuario);
        this.inicializaMaterialize();
      }
    );
  }

  salvar(usuario: Usuario) {
    this.usuarioService.alterarPerfil(this.auth.jwtPayload.idUsuario, usuario)
      .subscribe(user => {
        this.perfilUsuarioForm.patchValue(user);
        this.inicializaMaterialize();
        this.router.navigate(['admin']).then(
          () => this.confirmacao('Dados do Usuário Alterados com sucesso!!')
      );
      });
  }

  cancelar() {
    this.router.navigate(['admin']).then(
      () =>  this.confirmacao('Operação Cancelada !!')
  );
  }

  alterarSenha() {
    this.alteraSenhaAction.emit({action: 'modal', params: ['open']});
  }

  fechaModalSenha() {
    this.alteraSenhaAction.emit({action: 'modal', params: ['close']});
  }

  salvarSenha(senha: string) {
    this.usuarioService.alterarSenha(this.auth.jwtPayload.idUsuario, senha)
      .subscribe(() => {
        this.fechaModalSenha();
        this.confirmacao('Senha Alterada Com Sucesso!!');
        }
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
}

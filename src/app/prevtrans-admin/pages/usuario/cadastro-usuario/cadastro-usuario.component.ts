import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuario, UsuarioPermissao} from '../../../../shared/models';
import {CepService, UsuarioService} from '../../../../shared/services';
import {AuthService} from '../../../../shared/seguranca/auth.service';
import {ToastyService} from 'ng2-toasty';

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
  permissoes: UsuarioPermissao [];

  constructor(private formBuilder: FormBuilder,
              private routes: ActivatedRoute,
              private router: Router,
              private usuarioService: UsuarioService,
              public auth: AuthService,
              private toastyService: ToastyService) {
  }

  ngOnInit() {
    this.usuarioService.permissoes().subscribe(
      permissoes => {
        this.permissoes = permissoes;
      }
    );
    this.inicializaMaterialize();
    this.validaForm();
    this.usuario = new Usuario();
    const id = this.routes.snapshot.params['id'];
    if (id) {
      this.titulo = 'Alterar Usuário';
      this.carregarUsuario(id);
    } else {
      this.titulo = 'Cadastrar Usuário';
    }
  }

  get editando() {
    return Boolean(this.usuario.idUsuario);
  }

  carregarUsuario(id: string) {
    this.usuarioService.getUsuario(id).subscribe(usuario => {
      this.usuario = usuario;
      this.usuarioForm.patchValue(usuario);
      for (let i = 0; i < this.permissoes.length; i++) {
        for (let j = 0; j < usuario.usuarioPermissoes.length; j++) {
          if (this.permissoes[i].permissao === usuario.usuarioPermissoes[j].permissao) {
            this.permissoes[i] = usuario.usuarioPermissoes[j];
          }
        }
      }
      this.inicializaMaterialize();
    });
  }

  salvar(usuario: Usuario) {
    if (this.editando) {
      this.alterarUsuario(usuario);
    } else {
      this.cadastrarUsuario(usuario);
    }
  }

  alterarUsuario(usuario: Usuario) {
    usuario.idUsuario = this.usuario.idUsuario;
    this.usuarioService.putUsuario(this.usuario.idUsuario, usuario).subscribe(() => {
      this.router.navigate(['admin/usuarios']);
      this.confirmacao('Usuário Alterado com Sucesso!!');
    });
  }

  cadastrarUsuario(usuario: Usuario) {
    console.log(usuario);
    this.usuarioService.postUsuario(usuario).subscribe(
      () => {
        this.router.navigate(['admin/usuarios']);
        this.confirmacao('Usuário Cadastrado com Sucesso!!');
      }
    );
  }

  cancelar() {
    this.usuarioForm.reset();
    this.router.navigate(['admin/usuarios']);
  }

  validaForm() {
    this.usuarioForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      usuario: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.pattern(this.LOGIN_REGEX)]),
      usuarioPermissoes: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      ativo: ['']
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

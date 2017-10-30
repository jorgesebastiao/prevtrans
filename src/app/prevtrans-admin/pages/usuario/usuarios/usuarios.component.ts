import {Component, EventEmitter, OnInit} from '@angular/core';
import {UsuarioService} from '../../../../shared/services';
import {Usuario} from '../../../../shared/models/usuario.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterializeAction} from 'angular2-materialize';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  idUsuario: string;
  usuarios: Usuario[];
  senhaForm: FormGroup;
  alteraSenhaAction = new EventEmitter<string | MaterializeAction>();

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.validaForm();
    this.carregarUsuarios();
    this.inicializaMaterialize();
  }

  validaForm() {
    this.senhaForm = this.formBuilder.group({
      senha: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      verificaSenha: this.formBuilder.control('', [Validators.required, Validators.minLength(8)])
    }, {validator: UsuariosComponent.equalsTo});
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const senha = group.get('senha');
    const verificaSenha = group.get('verificaSenha');
    if (!senha || !verificaSenha) {
      return undefined;
    }
    if (senha.value !== verificaSenha.value) {
      return {senhaNotMatch: true}
    }
    return undefined;
  }

  carregarUsuarios() {
    this.usuarioService.usuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      }
    );
  }

  alterarSenha(id: string) {
    this.idUsuario = id;
    this.alteraSenhaAction.emit({action: 'modal', params: ['open']});
  }

  fechaModalSenha() {
    this.alteraSenhaAction.emit({action: 'modal', params: ['close']});
  }

  salvarSenha(senha: string) {
    this.usuarioService.alterarSenha(this.idUsuario, senha)
      .subscribe(() => {

        }
      );
  }

  inicializaMaterialize() {
    jQuery(document).ready(function () {
      Materialize.updateTextFields();
    });
  }
}

import {UsuarioPermissao} from './UsuarioPermissao.model';

export class Usuario {

  constructor(public idUsuario?: string,
              public nome?: string,
              public usuario?: string,
              public email?: string,
              public senha?: string,
              public ativo?: boolean,
              public usuarioPermissoes?: UsuarioPermissao[]) {
  }
}

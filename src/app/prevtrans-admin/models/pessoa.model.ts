import {Usuario} from './usuario.model';

export class Pessoa {

  constructor(public idPessoa?: string,
              public nome?: string,
              public dataNascimento?: string,
              public cpf?: string,
              public email?: string,
              public telefone?: string,
              public celular?: string,
              public cep?: string,
              public estado?: string,
              public cidade?: string,
              public bairro?: string,
              public endereco?: string,
              public numero?: string,
              public complemento?: string,
              public usuario?: Usuario) {
  }
}

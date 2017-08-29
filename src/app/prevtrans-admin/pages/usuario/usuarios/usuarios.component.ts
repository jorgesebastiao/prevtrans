import { Component, OnInit } from '@angular/core';
import {Pessoa} from '../../../../shared/models';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  pessoa: Pessoa;
  pessoas: Pessoa[]=[{
    nome: 'Jorge Sebastião Rodrigues Corrêa',
    cpf:'123456789',
    dataNascimento: '22/05/1994',
    usuario:{
      login: 'jorge'
    }
  }];

  constructor() { }

  ngOnInit() {
  }

  selecionaUsuario(pessoa: Pessoa) {
    this.pessoa = pessoa;
  }
}

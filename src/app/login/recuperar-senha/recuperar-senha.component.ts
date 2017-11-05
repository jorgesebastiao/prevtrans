import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecuperarSenhaService} from '../../shared/seguranca/';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  recuperaForm: FormGroup;
  erro: string;
  confirma: boolean;
  status: boolean;
  constructor(private formBuilder: FormBuilder,
              private recuperaSenhaService: RecuperarSenhaService) { }

  ngOnInit() {
    this.inicializaloginForm();
  }
  inicializaloginForm() {
    this.recuperaForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)])
    });
  }

  recuperarSenha(){
    this.status = true;
    this.recuperaSenhaService.recuperarSenha(this.recuperaForm.get('email').value).then(
      () => {
        this.erro = undefined;
        this.confirma = true;
        this.status = true;
      }
    ).catch(
      erro => {
        this.confirma = false;
        this.status = false;
        this.erro = erro;
    });
  }
  valida(){
    return !!this.erro;
  }
}

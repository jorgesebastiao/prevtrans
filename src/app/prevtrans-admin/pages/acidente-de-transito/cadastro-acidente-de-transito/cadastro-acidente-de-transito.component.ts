import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AcidenteTransito} from '../../../models/acidenteTransito.model';

declare var jQuery: any;

@Component({
  selector: 'app-cadastro-acidente-de-transito',
  templateUrl: './cadastro-acidente-de-transito.component.html',
  styleUrls: ['./cadastro-acidente-de-transito.component.css']
})
export class CadastroAcidenteDeTransitoComponent implements OnInit {

  acidenteTransitoForm: FormGroup;
  acidenteTransito: AcidenteTransito;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.acidenteTransito= new AcidenteTransito();
    this.acidenteTransitoForm=this.formBuilder.group(
      {
        tituloPublicacao: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(1000)])
      }
    );
  }

}

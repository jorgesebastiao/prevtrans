import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';

import {Instituicao} from '../../../models';
import {CepService, InstituicaoService} from '../../../services';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-incluir-instituicao',
  templateUrl: './incluir-instituicao.component.html',
  styleUrls: ['./incluir-instituicao.component.css']
})
export class IncluirInstituicaoComponent implements OnInit {
  cnpjPattern= /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
  cepPattern =  /^[0-9]{8}$/;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  instituicao = new Instituicao();
  instituicaoForm: FormGroup
  constructor(private formBuilder: FormBuilder, private routes:  ActivatedRoute, private cepService: CepService, private instituicaoService:  InstituicaoService  ) { }

  ngOnInit() {
    this.inicializaJquery();
    this.validaForm();
    const  id =  this.routes.snapshot.params['id'];
    if  (id)  {
      this.carregarInstituicao(id);
    }
  }

  get editando() {
    return Boolean(this.instituicao.idInstituicao);
  }

  salvar(instituicao: Instituicao){
    console.log(this.instituicaoForm.get('cnpj').value)
    if(this.editando) {
      console.log('alterando');
      this.alterarInstituicao(instituicao);
    }else{
      console.log('salvando');
      this.salvarInstituicao(instituicao);
    }
  }

  salvarInstituicao(instituicao: Instituicao){
    console.log(instituicao);
    this.instituicaoService.postInstituicao(instituicao)
     .subscribe(instituicao =>{ instituicao = instituicao
         this.instituicaoForm.patchValue(instituicao)
       }
     );
  }

  alterarInstituicao(instituicao: Instituicao){
    instituicao.idInstituicao=this.instituicao.idInstituicao;
    console.log(instituicao);
    this.instituicaoService.putInstituicao(instituicao)
      .subscribe(instituicao =>{ instituicao = instituicao
          this.instituicaoForm.patchValue(instituicao)
        }
      );
  }

  carregarInstituicao(id: string){
      this.instituicaoService.getInstituicao(id)
      .subscribe(instituicao =>{ this.instituicao = instituicao
      this.instituicaoForm.patchValue(this.instituicao)
      });
  }

  consultaCep(){
    let cepBusca = this.instituicaoForm.get('cep').value;
    console.log(cepBusca)
    if ( cepBusca && (cepBusca !== this.instituicao.cep)) {
      this.instituicao.cep=cepBusca
      this.cepService.consultaCep(cepBusca)
        .subscribe(dados => {
          this.instituicaoForm.patchValue({
            endereco: dados.logradouro,
            complemento: dados.complemento,
            bairro: dados.bairro,
            estado: dados.uf,
            cidade: dados.localidade
          });
        });
      this.inicializaJquery();
    }
  }

  validaForm(){
    this.instituicaoForm = this.formBuilder.group({
      razaoSocial: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
      nomeFantasia: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      cnpj: this.formBuilder.control('', [Validators.required]),
      inscricaoEstadual: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      inscricaoMunicipal: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      celular: this.formBuilder.control(''),
      cep: this.formBuilder.control('', [Validators.required, Validators.pattern(this.cepPattern)]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      numero: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      complemento: this.formBuilder.control(''),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      estado: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)])
    });
  }
  inicializaJquery(){
    jQuery(document).ready(function() {
      Materialize.updateTextFields();
    });
  }
}

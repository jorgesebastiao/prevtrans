import {Component, OnInit} from '@angular/core';
import {Instituicao} from '../../../../shared/models/instituicao.model';
import {InstituicaoService} from '../../../../shared/services';
import {AuthService} from '../../../../shared/seguranca/auth.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ToastyService} from 'ng2-toasty';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

declare const jQuery;

@Component({
  selector: 'app-instituicoes',
  templateUrl: './instituicoes.component.html',
  styleUrls: ['./instituicoes.component.css']
})
export class InstituicoesComponent implements OnInit {

  instituicoes: Instituicao[];
  instituicao: Instituicao;
  buscaInstituicaoForm: FormGroup;
  buscaControl: FormControl;

  constructor(private instituicaoService: InstituicaoService,
              public auth: AuthService,
              private formBuilder: FormBuilder,
              private toastyService: ToastyService) {
  }

  ngOnInit() {
    this.buscaControl = this.formBuilder.control('');
    this.buscaInstituicaoForm = this.formBuilder.group(
      {
        buscaControl: this.buscaControl
      }
    );
    this.buscaControl.valueChanges.debounceTime(500)
      .distinctUntilChanged()
      .switchMap(busca => this.instituicaoService.instituicoes(busca))
      .catch(erro => Observable.from([]))
      .subscribe(instituicoes => {
        if (instituicoes) {
          this.instituicoes = instituicoes;
        } else {
          this.toastyService.info('Instituição não encontrado');
        }
      });
    this.carregarInstituicao();
  }

  carregarInstituicao() {
    this.instituicaoService.instituicoes()
      .subscribe(instituicoes => this.instituicoes = instituicoes);

  }
}

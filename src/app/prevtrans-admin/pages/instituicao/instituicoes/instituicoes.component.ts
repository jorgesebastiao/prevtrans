import {Component, OnInit} from '@angular/core';
import {Instituicao} from '../../../../shared/models/instituicao.model';
import {InstituicaoService} from '../../../../shared/services';
import {AuthService} from '../../../../shared/seguranca/auth.service';
import {ErrorHandlerService} from '../../../../shared/error-handler.service';

declare const jQuery;

@Component({
  selector: 'app-instituicoes',
  templateUrl: './instituicoes.component.html',
  styleUrls: ['./instituicoes.component.css']
})
export class InstituicoesComponent implements OnInit {

  instituicoes: Instituicao[];
  instituicao: Instituicao;

  constructor(private instituicaoService: InstituicaoService,
              public auth: AuthService) {
  }

  ngOnInit() {
    this.instituicaoService.instituicoes()
      .subscribe(instituicoes =>  this.instituicoes = instituicoes);
  }
}

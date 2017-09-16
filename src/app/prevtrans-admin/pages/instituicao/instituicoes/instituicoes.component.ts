import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Instituicao} from '../../../../shared/models/instituicao.model';
import {InstituicaoService} from '../../../../shared/services';
import {AuthService} from '../../../../shared/seguranca/auth.service';
import {ErrorHandlerService} from '../../../../shared/error-handler.service';
import {ToastyService} from "ng2-toasty";

declare var jQuery;

@Component({
  selector: 'app-instituicoes',
  templateUrl: './instituicoes.component.html',
  styleUrls: ['./instituicoes.component.css']
})
export class InstituicoesComponent implements OnInit {

  instituicoes: Instituicao[];
  instituicao: Instituicao;

  constructor(private router: Router,
              private instituicaoService: InstituicaoService,
              public auth: AuthService,
              private errorHandler: ErrorHandlerService,
              private toastyService: ToastyService) {
  }

  ngOnInit() {
    console.log('carregando instituicoes');
    this.toastyService;
    this.inicializaJquery();
    this.instituicaoService.instituicoes()
      .subscribe(instituicoes =>  this.instituicoes = instituicoes);
  }
  private inicializaJquery() {
    jQuery(document).ready(function () {
      //  inicializa o jQuery
      jQuery('.button-collapse').sideNav();
      //  Função fechar ao clicar em link
      jQuery('.side-nav li a').on('click', function (e) {
        let windowsize: any;
        windowsize = jQuery(window).width();
        if (windowsize < 992) {
          jQuery('.button-collapse').sideNav('hide');
        }
      });
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {Instituicao} from '../../../models/instituicao.model';
import {InstituicaoService} from '../../../services';

declare var jQuery;

@Component({
  selector: 'app-instituicoes',
  templateUrl: './instituicoes.component.html',
  styleUrls: ['./instituicoes.component.css']
})
export class InstituicoesComponent implements OnInit {

  instituicoes: Instituicao[];
  instituicao: Instituicao;

  constructor(private router: Router, private instituicaoService: InstituicaoService) {
  }

  ngOnInit() {
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
  };
}

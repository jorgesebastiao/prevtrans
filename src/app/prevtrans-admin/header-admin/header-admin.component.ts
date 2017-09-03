import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})

export class HeaderAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  this.inicializaNavBar();
  }
  inicializaNavBar(){
    jQuery( document ).ready(function(){
      //  inicializa o jQuery
      jQuery('.button-collapse').sideNav();
      //  Função fechar ao clicar em link
      jQuery('.side-nav li a').on('click', function(e) {
        let windowsize: any;
        windowsize = jQuery(window).width();
        if (windowsize < 992) {
          jQuery('.button-collapse').sideNav('hide');
        }
      });
    });
  }
}

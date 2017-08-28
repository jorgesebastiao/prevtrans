import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery( document ).ready(function(){
    //  inicializa o jQuery
    jQuery('.button-collapse').sideNav();
    //  Função fechar ao clicar em link
    jQuery('.side-nav li a').on('click', function(e) {
    let  windowsize: any;
    windowsize = jQuery(window).width();
    if (windowsize < 992) {
      jQuery('.button-collapse').sideNav('hide');
    }
    });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../shared/seguranca/auth.service';
import {LogoutService} from '../../shared/seguranca/logout.service';
import {ErrorHandlerService} from 'app/shared';

declare var jQuery: any;
@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})

export class HeaderAdminComponent implements OnInit {

  constructor(private auth: AuthService, private logoutService: LogoutService,
              private errorHandler: ErrorHandlerService, private router: Router) { }

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

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}

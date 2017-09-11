import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-prevtrans-admin',
  templateUrl: './prevtrans-admin.component.html',
  styleUrls: ['./prevtrans-admin.component.css']
})
export class PrevtransAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  exibiNavBar(){
  return this.router.url !== '/admin/login';
  }

}

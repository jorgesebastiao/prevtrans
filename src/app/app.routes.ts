import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrevtransAdminRoutes} from './prevtrans-admin';
import {PrevtransPublicoRoutes} from './prevtrans-publico';
export const ROUTES: Routes = [
   ...PrevtransAdminRoutes,
   ...PrevtransPublicoRoutes
//  pagina not-foubd
//  {path:  '**', component: homeComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})

export class AppRoutes {

}

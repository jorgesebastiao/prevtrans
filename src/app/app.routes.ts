import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const ROUTES: Routes = [
  {path: '', loadChildren: './prevtrans-publico/prevtrans-publico.module#PrevtransPublicoModule'},
  {path: 'admin', loadChildren: './prevtrans-admin/prevtrans-admin.module#PrevtransAdminModule'}
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules})],
  exports: [ RouterModule ]
})

export class AppRoutes {

}

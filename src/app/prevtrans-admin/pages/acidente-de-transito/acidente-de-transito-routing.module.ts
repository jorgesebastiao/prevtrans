import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CadastroAcidenteDeTransitoComponent} from './cadastro-acidente-de-transito/cadastro-acidente-de-transito.component';
import {AcidentesDeTransitosComponent} from './acidentes-de-transitos/acidentes-de-transitos.component';
import {AuthGuard} from '../../../shared/seguranca/auth.guard';

const routes: Routes = [
  {
    path: '', component: AcidentesDeTransitosComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_ACIDENTE_DE_TRANSITO', 'ROLE_ALTERAR_ACIDENTE_DE_TRANSITO', 'ROLE_REMOVER_ACIDENTE_DE_TRANSITO']}
  },
  {
    path: 'novo', component: CadastroAcidenteDeTransitoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_ACIDENTE_DE_TRANSITO']}
  },
  {
    path: ':id', component: CadastroAcidenteDeTransitoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_ALTERAR_ACIDENTE_DE_TRANSITO']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcidenteDeTransitoRoutingModule {
}

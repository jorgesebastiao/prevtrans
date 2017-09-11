import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstituicoesComponent} from './instituicoes/instituicoes.component';
import {IncluirInstituicaoComponent} from './incluir-instituicao/incluir-instituicao.component';
import {AuthGuard} from '../../../shared/seguranca/auth.guard';

const routes: Routes = [
  {path: '',
    component: InstituicoesComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_LISTA_INSTITUICAO']} },
  {path: 'novo',
    component: IncluirInstituicaoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_INSTITUICAO']} },
  {path: ':id', component: IncluirInstituicaoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_ALTERAR_INSTITUICAO']} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituicaoRoutingModule { }

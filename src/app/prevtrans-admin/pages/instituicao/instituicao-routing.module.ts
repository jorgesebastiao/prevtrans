import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstituicoesComponent} from './instituicoes/instituicoes.component';
import {IncluirInstituicaoComponent} from './incluir-instituicao/incluir-instituicao.component';

const routes: Routes = [
  {path: '', component: InstituicoesComponent},
  {path: 'novo', component: IncluirInstituicaoComponent},
  {path: ':id', component: IncluirInstituicaoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituicaoRoutingModule { }

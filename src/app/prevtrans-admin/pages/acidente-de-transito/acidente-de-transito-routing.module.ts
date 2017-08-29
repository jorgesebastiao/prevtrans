import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CadastroAcidenteDeTransitoComponent} from './cadastro-acidente-de-transito/cadastro-acidente-de-transito.component';
import {AcidentesDeTransitosComponent} from './acidentes-de-transitos/acidentes-de-transitos.component';

const routes: Routes = [
  {path: '' , component: AcidentesDeTransitosComponent},
  {path: 'novo', component: CadastroAcidenteDeTransitoComponent},
  {path: ':id', component: CadastroAcidenteDeTransitoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcidenteDeTransitoRoutingModule { }

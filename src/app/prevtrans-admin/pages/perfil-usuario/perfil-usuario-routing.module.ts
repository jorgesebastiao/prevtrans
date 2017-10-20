import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PerfilUsuarioComponent} from './perfil-usuario.component';

const routes: Routes = [
  {path: '', component: PerfilUsuarioComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilUsuarioRoutingModule { }

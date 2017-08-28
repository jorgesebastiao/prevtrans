import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule} from 'angular2-materialize'
import { AdminComponent } from './admin/admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import {
  CadastroAcidenteDeTransitoComponent,
  AcidentesDeTransitosComponent,
  InstituicoesComponent ,
  IncluirInstituicaoComponent,
  LoginComponent,
  CadastroUsuarioComponent,
  UsuariosComponent
} from './pages';
import { InputComponent} from './shared';
import { CepPipe } from './pipes/cep.pipe';
import {
  CepService,
  InstituicaoService,
  PessoaService,
  UsuarioService} from './services';
import { CpnjPipe } from './pipes/cpnj.pipe';
import { PrevtransMaskDirective } from './directives/prevtrans-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule
  ],
  declarations: [AdminComponent, HeaderAdminComponent, IncluirInstituicaoComponent,
    InputComponent, InstituicoesComponent,
     AcidentesDeTransitosComponent, CadastroAcidenteDeTransitoComponent,
    CepPipe, LoginComponent, CadastroUsuarioComponent, UsuariosComponent, CpnjPipe, PrevtransMaskDirective],
  providers:  [CepService, InstituicaoService, PessoaService, UsuarioService]
})
export class PrevtransAdminModule { }

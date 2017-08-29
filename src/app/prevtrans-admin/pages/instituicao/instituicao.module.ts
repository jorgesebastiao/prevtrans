import { NgModule } from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import { InstituicaoRoutingModule } from './instituicao-routing.module';
import {IncluirInstituicaoComponent} from './incluir-instituicao/incluir-instituicao.component';
import {InstituicoesComponent} from './instituicoes/instituicoes.component';

@NgModule({
  imports: [
    SharedModule,
    InstituicaoRoutingModule
  ],
  declarations: [IncluirInstituicaoComponent, InstituicoesComponent]
})
export class InstituicaoModule { }

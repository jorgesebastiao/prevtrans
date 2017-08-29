import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CepPipe, CpnjPipe} from '../prevtrans-admin/pipes';
import {PrevtransMaskDirective} from '../prevtrans-admin/directives/prevtrans-mask.directive';
import {InstituicaoService,
  PessoaService,
  CepService,
  UsuarioService} from '../prevtrans-admin/services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [InputComponent, CepPipe, CpnjPipe, PrevtransMaskDirective],
  exports:  [ InputComponent, CepPipe, CpnjPipe, PrevtransMaskDirective, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers:[ InstituicaoService, PessoaService, CepService, UsuarioService]
    }
  }
}

import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CepPipe, CpnjPipe, TelefonePipe} from './pipes';
import {PrevtransMaskDirective} from './directives/prevtrans-mask.directive';
import { MaterializeDirective } from 'angular2-materialize';

import {AcidenteTransitoService,
  InstituicaoService,
  PessoaService,
  CepService,
  UsuarioService} from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [InputComponent, CepPipe, CpnjPipe, TelefonePipe, PrevtransMaskDirective],
  exports:  [ InputComponent, CepPipe, CpnjPipe, TelefonePipe, PrevtransMaskDirective, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ AcidenteTransitoService, InstituicaoService, PessoaService, CepService, UsuarioService]
    }
  }
}

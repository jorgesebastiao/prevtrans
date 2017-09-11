import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtHelper} from 'angular2-jwt';
import { ToastyModule } from 'ng2-toasty';
import {CepPipe, CpnjPipe, TelefonePipe} from './pipes';
import {PrevtransMaskDirective} from './directives/prevtrans-mask.directive';
import {AgmCoreModule} from '@agm/core';
import {AcidenteTransitoService,
InstituicaoService,
PessoaService,
CepService,
UsuarioService} from './services';
import {AuthService} from './seguranca/auth.service';
import {ErrorHandlerService} from './error-handler.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastyModule.forRoot(),
    AgmCoreModule,
    ReactiveFormsModule
  ],
  declarations: [InputComponent, CepPipe, CpnjPipe, TelefonePipe, PrevtransMaskDirective],
  exports:  [ ToastyModule, InputComponent,
    CepPipe, CpnjPipe, TelefonePipe,
    PrevtransMaskDirective, CommonModule,
    FormsModule, AgmCoreModule, ReactiveFormsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ErrorHandlerService,
        AcidenteTransitoService,
        InstituicaoService,
        PessoaService,
        CepService,
        UsuarioService,
        AuthService,
        JwtHelper]
    }
  }
}

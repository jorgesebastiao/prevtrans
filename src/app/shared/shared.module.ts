import {LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtHelper} from 'angular2-jwt';
import {CepPipe, CpnjPipe, TelefonePipe} from './pipes';
import {PrevtransMaskDirective} from './directives/prevtrans-mask.directive';
import {AgmCoreModule} from '@agm/core';
import {
  AcidenteTransitoService,
  CepService,
  GoogleMapsService,
  InstituicaoService,
  PessoaService,
  TipoVeiculoService,
  UsuarioService
} from './services';
import {AuthService} from './seguranca/auth.service';
import {ErrorHandlerService} from './error-handler.service';
import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule.forRoot(),
    AgmCoreModule,
    ReactiveFormsModule
  ],
  declarations: [InputComponent, CepPipe,
    CpnjPipe, TelefonePipe, PrevtransMaskDirective],
  exports: [MaterializeModule, InputComponent,
    CepPipe, CpnjPipe, TelefonePipe,
    PrevtransMaskDirective, CommonModule, FormsModule,
    AgmCoreModule, ReactiveFormsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ErrorHandlerService,
        AcidenteTransitoService,
        CepService,
        GoogleMapsService,
        InstituicaoService,
        PessoaService,
        TipoVeiculoService,
        UsuarioService,
        AuthService,
        JwtHelper,
        {provide: LOCALE_ID, useValue: 'pt-BR'}
      ]
    }
  }
}

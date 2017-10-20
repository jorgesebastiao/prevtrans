import {LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtHelper} from 'angular2-jwt';
import {CepPipe, CpnjPipe, TelefonePipe} from './pipes';
import {PrevtransMaskDirective} from './directives/prevtrans-mask.directive';
import 'materialize-css';
import {MaterializeModule} from 'angular2-materialize';
import {AgmCoreModule} from '@agm/core';
import {AgmJsMarkerClustererModule, ClusterManager} from '@agm/js-marker-clusterer';
import {ErrorHandlerService} from './error-handler.service';
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule.forRoot(),
    AgmCoreModule,
    AgmJsMarkerClustererModule,
    ReactiveFormsModule
  ],
  declarations: [InputComponent, CepPipe,
    CpnjPipe, TelefonePipe, PrevtransMaskDirective],
  exports: [MaterializeModule, InputComponent,
    CepPipe, CpnjPipe, TelefonePipe,
    PrevtransMaskDirective, CommonModule, FormsModule,
    AgmCoreModule, AgmJsMarkerClustererModule, ReactiveFormsModule]
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
        ClusterManager,
        {provide: LOCALE_ID, useValue: 'pt-BR'}
      ]
    }
  }
}

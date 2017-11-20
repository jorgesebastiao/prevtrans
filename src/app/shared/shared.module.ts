import {LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtHelper} from 'angular2-jwt';
import {CepPipe, CpnjPipe, CpfPipe, TelefonePipe} from './pipes';
import {PrevtransMaskDirective} from './directives/prevtrans-mask.directive';
import {MaterializeModule} from 'angular2-materialize';
import {AgmCoreModule} from '@agm/core';
import {AgmJsMarkerClustererModule, ClusterManager} from '@agm/js-marker-clusterer';
import {ErrorHandlerService} from './error-handler.service';
import {
  AcidenteTransitoService,
  CepService,
  GoogleMapsService,
  InstituicaoService,
  TipoVeiculoService,
  TipoAcidenteTransitoService,
  UsuarioService,
  ViaService,
  VisibilidadeService,
  SinalizacaoService,
  PeriodoDiaService,
  ClimaService,
  PistaService,
  AnalisaAcidenteTransitoService
} from './services';
import {AuthService, RecuperarSenhaService} from './seguranca';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule.forRoot(),
    AgmCoreModule,
    AgmJsMarkerClustererModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  declarations: [InputComponent, CepPipe,
    CpnjPipe, TelefonePipe, PrevtransMaskDirective, CpfPipe],
  exports: [MaterializeModule, InputComponent,
    CepPipe, CpnjPipe, CpfPipe, TelefonePipe,
    PrevtransMaskDirective, CommonModule, FormsModule,
    AgmCoreModule, AgmJsMarkerClustererModule,
    ReactiveFormsModule, NgxChartsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ErrorHandlerService,
        AcidenteTransitoService,
        AnalisaAcidenteTransitoService,
        CepService,
        GoogleMapsService,
        InstituicaoService,
        TipoVeiculoService,
        TipoAcidenteTransitoService,
        UsuarioService,
        ViaService,
        VisibilidadeService,
        SinalizacaoService,
        PeriodoDiaService,
        ClimaService,
        PistaService,
        AuthService,
        RecuperarSenhaService,
        JwtHelper,
        ClusterManager,
        {provide: LOCALE_ID, useValue: 'pt-BR'}
      ]
    }
  }
}

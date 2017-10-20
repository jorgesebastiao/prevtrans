import {NgModule} from '@angular/core';
import {PerfilUsuarioRoutingModule} from './perfil-usuario-routing.module';
import {PerfilUsuarioComponent} from './perfil-usuario.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PerfilUsuarioRoutingModule
  ],
  declarations: [PerfilUsuarioComponent]
})
export class PerfilUsuarioModule {
}

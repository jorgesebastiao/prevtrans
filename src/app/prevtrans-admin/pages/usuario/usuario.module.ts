import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {CadastroUsuarioComponent} from './cadastro-usuario/cadastro-usuario.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {UsuarioRoutes} from './usuario.module.routing';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(UsuarioRoutes)
  ],
  declarations: [CadastroUsuarioComponent, UsuariosComponent]
})
export class UsuarioModule { }

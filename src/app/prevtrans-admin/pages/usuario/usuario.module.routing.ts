import {Routes} from '@angular/router';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {CadastroUsuarioComponent} from './cadastro-usuario/cadastro-usuario.component';
import {AuthGuard} from '../../../shared/seguranca/auth.guard';

export const UsuarioRoutes: Routes = [
  {
    path: '', component: UsuariosComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_USUARIO', 'ROLE_ALTERAR_USUARIO', 'ROLE_REMOVER_USUARIO']}
  },
  {
    path: 'novo', component: CadastroUsuarioComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_USUARIO']}
  },
  {
    path: ':id', component: CadastroUsuarioComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_ALTERAR_USUARIO']}
  }
];

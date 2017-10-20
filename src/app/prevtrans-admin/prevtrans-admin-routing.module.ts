import {Routes} from '@angular/router';
import {PrevtransAdminComponent} from './prevtrans-admin.component';
import {AuthGuard} from '../shared/seguranca/auth.guard';

export const PrevtransAdminRoutes: Routes = [
  {
    path: '', component: PrevtransAdminComponent,
    children: [
      {path: 'acidentes-de-transitos', loadChildren: './pages/acidente-de-transito/acidente-de-transito.module#AcidenteDeTransitoModule'},
      {path: 'instituicoes',  loadChildren: './pages/instituicao/instituicao.module#InstituicaoModule'},
      {path: 'usuarios', loadChildren: './pages/usuario/usuario.module#UsuarioModule'},
      {path: 'perfil-usuario', loadChildren: './pages/perfil-usuario/perfil-usuario.module#PerfilUsuarioModule'}
    ],
    canActivate: [AuthGuard],
  }
];


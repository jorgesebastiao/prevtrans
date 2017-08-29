import {Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';

export const PrevtransAdminRoutes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {path: 'acidentes-de-transitos', loadChildren: './pages/acidente-de-transito/acidente-de-transito.module#AcidenteDeTransitoModule'},
      {path: 'instituicoes',  loadChildren: './pages/instituicao/instituicao.module#InstituicaoModule'},
      {path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
      {path: 'usuarios', loadChildren: './pages/usuario/usuario.module#UsuarioModule'}
    ]
  }
];


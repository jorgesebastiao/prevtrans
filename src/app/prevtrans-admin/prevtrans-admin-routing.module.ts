import {Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';

import {
  CadastroAcidenteDeTransitoComponent,
  AcidentesDeTransitosComponent,
  InstituicoesComponent,
  IncluirInstituicaoComponent,
  LoginComponent,
  UsuariosComponent,
  CadastroUsuarioComponent
} from './pages';

export const PrevtransAdminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      {path: 'acidentes-de-transitos', component: AcidentesDeTransitosComponent},
      {path: 'acidentes-de-transitos/novo', component: CadastroAcidenteDeTransitoComponent},
      {path: 'acidentes-de-transitos/:id', component: CadastroAcidenteDeTransitoComponent},
      {path: 'instituicoes', component: InstituicoesComponent},
      {path: 'instituicoes/novo', component: IncluirInstituicaoComponent},
      {path: 'instituicoes/:id', component: IncluirInstituicaoComponent},
      {path: 'login', component: LoginComponent},
      {path: 'usuarios', component: UsuariosComponent},
      {path: 'usuarios/novo', component: CadastroUsuarioComponent},
      {path: 'usuarios/:id', component: CadastroUsuarioComponent},
    ]
  }
];


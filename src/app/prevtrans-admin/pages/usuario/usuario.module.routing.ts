import {Routes} from '@angular/router';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {CadastroUsuarioComponent} from './cadastro-usuario/cadastro-usuario.component';

export const UsuarioRoutes: Routes = [
  {path: '', component: UsuariosComponent, pathMatch: 'full' },
  {path: 'novo', component: CadastroUsuarioComponent},
  {path: ':id', component: CadastroUsuarioComponent}
]

import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RecuperarSenhaComponent} from './recuperar-senha/recuperar-senha.component';
import {LoginsComponent} from './logins.component';
import {NgModule} from '@angular/core';

export const LoginRoutes: Routes = [
  {path: 'login', component: LoginsComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'recuperar-senha',  component: RecuperarSenhaComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(LoginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

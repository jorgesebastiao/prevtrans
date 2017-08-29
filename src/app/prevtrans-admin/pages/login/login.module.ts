import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginRoutes} from './login.module.routing';
import {LoginComponent} from './login.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(LoginRoutes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }

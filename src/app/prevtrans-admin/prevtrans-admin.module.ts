import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import {PrevtransAdminRoutes} from './prevtrans-admin-routing.module';

@NgModule({
  imports: [
    RouterModule.forChild(PrevtransAdminRoutes)
  ],
  declarations: [AdminComponent, HeaderAdminComponent],
})
export class PrevtransAdminModule { }

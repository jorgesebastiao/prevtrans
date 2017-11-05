import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastyConfig, ToastyModule, ToastyService} from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot()
  ],
  declarations: [],
  exports: [
    ToastyModule
  ],
  providers: [
    ToastyService,
    ToastyConfig,
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule só pode ser carregado no App Module');
    }
  }
}

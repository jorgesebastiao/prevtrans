import {Routes} from '@angular/router';
import {AcidentesMapsComponent} from './acidentes-maps/acidentes-maps.component';
import {PrevtransPublicoComponent} from './prevtrans-publico.component';

export const PrevtransPublicoRoutes: Routes = [
  {
    path: '', component: PrevtransPublicoComponent,
    children: [
      {path: '', component: AcidentesMapsComponent},
      {path: 'dados-estatisticos', loadChildren: './graficos/graficos.module#GraficosModule'}
    ]
  }
];


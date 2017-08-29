import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AcidentesMapsComponent} from './acidentes-maps/acidentes-maps.component';

export const PrevtransPublicoRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: AcidentesMapsComponent},
      {path: 'graficos', loadChildren: './graficos/graficos.module#GraficosModule'}
    ]
  }
];


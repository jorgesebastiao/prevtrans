import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {GraficosComponent} from './graficos/graficos.component';
import {AcidentesMapsComponent} from './acidentes-maps/acidentes-maps.component';

export const PrevtransPublicoRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: AcidentesMapsComponent},
      {path: 'graficos', component: GraficosComponent}
    ]
  }
];


import { DashboardGeneralComponent } from './dashboard/dashboard-general/dashboard-general.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardGeneralComponent,
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesModule),
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('./resources/resources.module').then((m) => m.ResourcesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelComponentsRoutingModule {}

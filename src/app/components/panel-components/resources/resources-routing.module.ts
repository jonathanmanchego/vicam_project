import { EstadoContratoComponent } from './estado-contrato/estado-contrato.component';
import { RolesComponent } from './roles/roles.component';
import { PlazosPagosComponent } from './plazos-pagos/plazos-pagos.component';
import { EstadoPagosComponent } from './estado-pagos/estado-pagos.component';
import { EstadoSolicitudesComponent } from './estado-solicitudes/estado-solicitudes.component';
import { ResourcesGeneralComponent } from './resources-general/resources-general.component';
import { BankCreateComponent } from './banks/bank-create/bank-create.component';
import { BankListComponent } from './banks/bank-list/bank-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoTarjetasComponent } from './tipo-tarjetas/tipo-tarjetas.component';

const routes: Routes = [
  {
    path: '',
    component: ResourcesGeneralComponent,
  },
  {
    path: 'bancos',
    component: BankListComponent,
  },
  {
    path: 'estados-solicitud',
    component: EstadoSolicitudesComponent,
  },
  {
    path: 'estados-contrato',
    component: EstadoContratoComponent,
  },
  {
    path: 'estados-pago',
    component: EstadoPagosComponent,
  },
  {
    path: 'plazos-pago',
    component: PlazosPagosComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'tipo-tarjetas',
    component: TipoTarjetasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}

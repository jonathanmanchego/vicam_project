import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { BankCreateComponent } from './banks/bank-create/bank-create.component';
import { BankListComponent } from './banks/bank-list/bank-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { ResourcesGeneralComponent } from './resources-general/resources-general.component';
import { EstadoSolicitudesComponent } from './estado-solicitudes/estado-solicitudes.component';
import { EstadoPagosComponent } from './estado-pagos/estado-pagos.component';
import { PlazosPagosComponent } from './plazos-pagos/plazos-pagos.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EstadoContratoComponent } from './estado-contrato/estado-contrato.component';
import { TipoTarjetasComponent } from './tipo-tarjetas/tipo-tarjetas.component';

@NgModule({
  declarations: [BankCreateComponent, BankListComponent, ResourcesGeneralComponent, EstadoSolicitudesComponent, EstadoPagosComponent, PlazosPagosComponent, RolesComponent, UsuariosComponent, EstadoContratoComponent, TipoTarjetasComponent],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
})
export class ResourcesModule {}

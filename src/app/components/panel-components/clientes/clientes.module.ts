import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [CreateClientComponent, ListClientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    ClientesRoutingModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
})
export class ClientesModule {}

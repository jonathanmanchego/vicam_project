import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { BankCreateComponent } from './banks/bank-create/bank-create.component';
import { BankListComponent } from './banks/bank-list/bank-list.component';


@NgModule({
  declarations: [
    BankCreateComponent,
    BankListComponent
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule
  ]
})
export class ResourcesModule { }

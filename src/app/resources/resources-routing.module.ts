import { BankCreateComponent } from './banks/bank-create/bank-create.component';
import { BankListComponent } from './banks/bank-list/bank-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bancos/list',
    component: BankListComponent
  },
  {
    path: 'bancos/create',
    component: BankCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }

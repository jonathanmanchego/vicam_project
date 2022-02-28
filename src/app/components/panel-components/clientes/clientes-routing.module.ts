import { ListClientComponent } from './list-client/list-client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './create-client/create-client.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListClientComponent
  },
  {
    path: 'create',
    component: CreateClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }

import { PanelLayoutComponent } from './page-component/panel-layout/panel-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./page-component/page-component.module').then(
        (m) => m.PageComponentModule
      ),
  },
  {
    path: '**',
    redirectTo: 'users/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

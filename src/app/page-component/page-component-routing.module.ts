import { AuthLayoutUsersComponent } from './auth-layout-users/auth-layout-users.component';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';
import { PanelComponentsModule } from './../components/panel-components/panel-components.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PanelLayoutComponent,
    loadChildren: () =>
      import('../components/panel-components/panel-components.module').then(
        (m) => PanelComponentsModule
      ),
  },
  {
    path: 'login/vicam',
    component: AuthLayoutUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageComponentRoutingModule {}

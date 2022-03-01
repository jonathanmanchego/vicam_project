import { AuthComponentsModule } from './../components/auth-components/auth-components.module';
import { AuthLayoutUsersComponent } from './auth-layout-users/auth-layout-users.component';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';
import { PanelComponentsModule } from './../components/panel-components/panel-components.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from '../commons/guard/auth-user.guard';

const routes: Routes = [
  {
    path: '',
    component: PanelLayoutComponent,
    canActivate: [AuthUserGuard],
    data: {
      authGuardRedirect: '/users/login',
    },
    loadChildren: () =>
      import('../components/panel-components/panel-components.module').then(
        (m) => PanelComponentsModule
      ),
  },
  {
    path: 'users',
    component: AuthLayoutUsersComponent,
    loadChildren: () =>
      import('../components/auth-components/auth-components.module').then(
        (m) => AuthComponentsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageComponentRoutingModule {}

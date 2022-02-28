import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageComponentRoutingModule } from './page-component-routing.module';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';
import { AuthLayoutClientsComponent } from './auth-layout-clients/auth-layout-clients.component';
import { AuthLayoutUsersComponent } from './auth-layout-users/auth-layout-users.component';
import { LayoutModule } from '../components/layout/layout.module';

@NgModule({
  declarations: [
    PanelLayoutComponent,
    AuthLayoutClientsComponent,
    AuthLayoutUsersComponent,
  ],
  imports: [CommonModule, PageComponentRoutingModule, LayoutModule],
})
export class PageComponentModule {}

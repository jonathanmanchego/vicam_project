import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponentsRoutingModule } from './panel-components-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PanelComponentsRoutingModule, DashboardModule],
})
export class PanelComponentsModule {}

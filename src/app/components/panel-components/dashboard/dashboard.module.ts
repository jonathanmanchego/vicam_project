import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionNotificationsComponent } from './section-notifications/section-notifications.component';
import { DashboardGeneralComponent } from './dashboard-general/dashboard-general.component';
import { GraphNewUsersComponent } from './graph-new-users/graph-new-users.component';

@NgModule({
  declarations: [
    SectionNotificationsComponent,
    DashboardGeneralComponent,
    GraphNewUsersComponent,
  ],
  imports: [CommonModule, NgChartsModule],
})
export class DashboardModule {}

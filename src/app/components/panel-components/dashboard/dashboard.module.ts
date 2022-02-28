import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionNotificationsComponent } from './section-notifications/section-notifications.component';
import { DashboardGeneralComponent } from './dashboard-general/dashboard-general.component';



@NgModule({
  declarations: [
    SectionNotificationsComponent,
    DashboardGeneralComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }

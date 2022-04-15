import { Component, OnInit } from '@angular/core';
import { BreadcrumService } from 'src/app/services/layout/breadcrum.service';

@Component({
  selector: 'app-dashboard-general',
  templateUrl: './dashboard-general.component.html',
  styleUrls: ['./dashboard-general.component.scss'],
})
export class DashboardGeneralComponent implements OnInit {
  constructor(private readonly breadcrumService: BreadcrumService) {}

  ngOnInit(): void {
    this.breadcrumService.setBreadcrum([
      {
        label: 'Inicio',
        current: true,
        link: '/',
      },
    ]);
  }
}

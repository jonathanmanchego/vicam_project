import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumService } from 'src/app/services/layout/breadcrum.service';

@Component({
  selector: 'app-resources-general',
  templateUrl: './resources-general.component.html',
  styleUrls: ['./resources-general.component.scss'],
})
export class ResourcesGeneralComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly breadcrumService: BreadcrumService
  ) {}

  ngOnInit(): void {
    this.breadcrumService.setBreadcrum([
      {
        label: 'Inicio',
        current: false,
        link: '/',
      },
      {
        label: 'Datos Generales',
        current: true,
        link: undefined,
      },
    ]);
  }
  navigateTo(resource: string): void {
    this.router.navigateByUrl('/resources' + resource);
  }
}

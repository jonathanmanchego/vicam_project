import { Component, OnInit } from '@angular/core';
import { BankInterface } from 'src/app/commons/state/interfaces/bank-interface';
import { BankApiService } from 'src/app/services/api/bank-api.service';
import { BreadcrumService } from 'src/app/services/layout/breadcrum.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent implements OnInit {
  bancos: BankInterface[] = [];
  loading = false;
  constructor(
    private readonly bankApiService: BankApiService,
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
        current: false,
        link: '/resources/',
      },
      {
        label: 'Bancos',
        current: true,
        link: undefined,
      },
    ]);
    this.initTable();
  }
  initTable(): void {
    if (this.bankApiService.getValues().length > 0) {
      this.bancos = this.bankApiService.getValues();
    } else {
      this.loading = true;
      this.bankApiService.getAll().subscribe(
        () => {
          this.bancos = this.bankApiService.getValues();
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
}

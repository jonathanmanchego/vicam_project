import { Component, OnInit } from '@angular/core';
import { BankInterface } from 'src/app/commons/state/interfaces/bank-interface';
import { BankApiService } from 'src/app/services/api/bank-api.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent implements OnInit {
  bancos: BankInterface[] = [];
  loading = false;
  constructor(private readonly bankApiService: BankApiService) {}

  ngOnInit(): void {
    if (this.bankApiService.getValues().length === 0) {
      this.loading = true;
      this.bankApiService.getAll().subscribe(
        (bancos: BankInterface[]) => {
          this.bancos = bancos;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
}

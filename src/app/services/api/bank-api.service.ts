import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BankInterface } from 'src/app/commons/state/interfaces/bank-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class BankApiService extends StateApiService<BankInterface> {
  constructor() {
    super();
    this.url = '/api/v1/bank';
    this.http = inject(HttpClient)
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProvinciaInterface } from 'src/app/commons/state/interfaces/provincia-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProvinciaApiService extends StateApiService<ProvinciaInterface> {
  constructor() {
    super();
    this.url = '/api/provincia';
    this.http = inject(HttpClient);
  }
}

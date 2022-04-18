import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DepartamentoInterface } from 'src/app/commons/state/interfaces/departamento-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoApiService extends StateApiService<DepartamentoInterface> {
  constructor() {
    super();
    this.url = '/api/departamento';
    this.http = inject(HttpClient);
  }
}

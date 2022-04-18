import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaisInterface } from 'src/app/commons/state/interfaces/pais-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class PaisApiService extends StateApiService<PaisInterface> {
  constructor() {
    super();
    this.url = '/api/pais';
    this.http = inject(HttpClient);
  }
}

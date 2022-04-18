import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalidadInterface } from 'src/app/commons/state/interfaces/localidad-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class LocalidadApiService extends StateApiService<LocalidadInterface> {
  constructor() {
    super();
    this.url = '/api/localidad';
    this.http = inject(HttpClient);
  }
}

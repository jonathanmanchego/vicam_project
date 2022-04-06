import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TarjetaInterface } from 'src/app/commons/state/interfaces/tarjeta-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class TarjetaApiService extends StateApiService<TarjetaInterface> {
  constructor() {
    super();
    this.url = '/api/tarjetas';
    this.http = inject(HttpClient);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TipoTarjetaInterface } from 'src/app/commons/state/interfaces/tipo-tarjeta-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class TipoTarjetaApiService extends StateApiService<TipoTarjetaInterface> {
  constructor() {
    super();
    this.url = '/api/tipoTarjetas';
    this.http = inject(HttpClient);
  }
}

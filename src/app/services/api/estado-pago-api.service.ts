import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EstadoPagoInterface } from 'src/app/commons/state/interfaces/estado-pago-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoPagoApiService extends StateApiService<EstadoPagoInterface> {
  constructor() {
    super();
    this.url = '/api/estadoPagos';
    this.http = inject(HttpClient);
  }
}

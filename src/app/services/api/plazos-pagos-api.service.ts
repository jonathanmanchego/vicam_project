import { PlazosPagoInterface } from './../../commons/state/interfaces/plazos-pago-interface';
import { inject, Injectable } from '@angular/core';
import { StateApiService } from './state-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlazosPagosApiService extends StateApiService<PlazosPagoInterface> {
  constructor() {
    super();
    this.url = '/api/plazosPagos';
    this.http = inject(HttpClient);
  }
}

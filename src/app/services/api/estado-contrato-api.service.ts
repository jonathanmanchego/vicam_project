import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EstadoContratoInterface } from 'src/app/commons/state/interfaces/estado-contrato-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoContratoApiService extends StateApiService<EstadoContratoInterface> {
  constructor() {
    super();
    this.url = '/api/estadoContratos';
    this.http = inject(HttpClient);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EstadoSolicitudInterface } from 'src/app/commons/state/interfaces/estado-solicitud-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoSolicitudesApiService extends StateApiService<EstadoSolicitudInterface> {
  constructor() {
    super();
    this.url = '/api/estadosSolicitudes';
    this.http = inject(HttpClient);
  }
}

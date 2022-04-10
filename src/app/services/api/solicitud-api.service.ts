import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SolicitudInterface } from 'src/app/commons/state/interfaces/solicitud-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudApiService extends StateApiService<SolicitudInterface> {
  constructor() {
    super();
    this.url = '/api/solicitudes';
    this.http = inject(HttpClient);
  }
}

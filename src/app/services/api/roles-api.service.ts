import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EstadoSolicitudInterface } from 'src/app/commons/state/interfaces/estado-solicitud-interface';
import { RolInterface } from 'src/app/commons/state/interfaces/rol-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root',
})
export class RolesApiService extends StateApiService<RolInterface> {
  constructor() {
    super();
    this.url = '/api/roles';
    this.http = inject(HttpClient);
  }
}

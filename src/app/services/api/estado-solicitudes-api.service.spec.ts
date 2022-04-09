import { TestBed } from '@angular/core/testing';

import { EstadoSolicitudesApiService } from './estado-solicitudes-api.service';

describe('EstadoSolicitudesApiService', () => {
  let service: EstadoSolicitudesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoSolicitudesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EstadoContratoApiService } from './estado-contrato-api.service';

describe('EstadoContratoApiService', () => {
  let service: EstadoContratoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoContratoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

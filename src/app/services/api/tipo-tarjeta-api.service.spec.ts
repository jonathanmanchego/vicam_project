import { TestBed } from '@angular/core/testing';

import { TipoTarjetaApiService } from './tipo-tarjeta-api.service';

describe('TipoTarjetaApiService', () => {
  let service: TipoTarjetaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTarjetaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

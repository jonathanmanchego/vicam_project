import { TestBed } from '@angular/core/testing';

import { EstadoPagoApiService } from './estado-pago-api.service';

describe('EstadoPagoApiService', () => {
  let service: EstadoPagoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoPagoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

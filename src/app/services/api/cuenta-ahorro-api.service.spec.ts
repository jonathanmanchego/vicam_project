import { TestBed } from '@angular/core/testing';

import { CuentaAhorroApiService } from './cuenta-ahorro-api.service';

describe('CuentaAhorroApiService', () => {
  let service: CuentaAhorroApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentaAhorroApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

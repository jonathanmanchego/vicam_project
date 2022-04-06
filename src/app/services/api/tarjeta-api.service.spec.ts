import { TestBed } from '@angular/core/testing';

import { TarjetaApiService } from './tarjeta-api.service';

describe('TarjetaApiService', () => {
  let service: TarjetaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

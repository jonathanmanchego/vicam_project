import { TestBed } from '@angular/core/testing';

import { PlazosPagosApiService } from './plazos-pagos-api.service';

describe('PlazosPagosApiService', () => {
  let service: PlazosPagosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlazosPagosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

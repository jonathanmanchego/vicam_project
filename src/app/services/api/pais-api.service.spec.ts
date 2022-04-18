import { TestBed } from '@angular/core/testing';

import { PaisApiService } from './pais-api.service';

describe('PaisApiService', () => {
  let service: PaisApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaisApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

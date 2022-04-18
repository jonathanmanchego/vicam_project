import { TestBed } from '@angular/core/testing';

import { LocalidadApiService } from './localidad-api.service';

describe('LocalidadApiService', () => {
  let service: LocalidadApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalidadApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

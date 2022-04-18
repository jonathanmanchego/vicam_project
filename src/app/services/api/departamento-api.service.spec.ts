import { TestBed } from '@angular/core/testing';

import { DepartamentoApiService } from './departamento-api.service';

describe('DepartamentoApiService', () => {
  let service: DepartamentoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

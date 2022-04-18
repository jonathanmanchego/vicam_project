import { TestBed } from '@angular/core/testing';

import { ProvinciaApiService } from './provincia-api.service';

describe('ProvinciaApiService', () => {
  let service: ProvinciaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinciaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PrestamistaApiService } from './prestamista-api.service';

describe('PrestamistaApiService', () => {
  let service: PrestamistaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamistaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

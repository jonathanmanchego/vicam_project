import { TestBed } from '@angular/core/testing';

import { SolicitudApiService } from './solicitud-api.service';

describe('SolicitudApiService', () => {
  let service: SolicitudApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

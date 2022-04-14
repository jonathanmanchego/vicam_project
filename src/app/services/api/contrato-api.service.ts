import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateApiService } from './state-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContratoApiService extends StateApiService<any> {
  constructor() {
    super();
    this.url = '/api/contratos';
    this.http = inject(HttpClient);
  }
  generateContract(prestamistaId: number): Observable<any> {
    return this.http.get(
      environment.backend + this.url + '/PDF/' + prestamistaId,
      {
        responseType: 'blob',
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PrestamistaInterface } from 'src/app/commons/state/interfaces/prestamista-interface';
import { StateApiService } from './state-api.service';

@Injectable({
  providedIn: 'root'
})
export class PrestamistaApiService extends StateApiService<any> {

  constructor() {
    super();
    this.url = '/api/prestamistas';
    this.http = inject(HttpClient)
  }
}

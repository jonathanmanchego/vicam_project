import { inject, Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Client } from '../commons/models/client';
import { StateService } from './state.service';
@Injectable({
  providedIn: 'root'
})
export class ClientstStateService extends StateService<Client>{
  override table = 'clients';

  constructor() {
    super();
    this.database = inject(AngularFireDatabase);
    this.items = this.database.list(this.table).valueChanges();
  }
}

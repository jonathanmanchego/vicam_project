import { inject, Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Bank } from '../commons/models/bank';
import { Client } from '../models/client';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class BanksStateService extends StateService<Bank>{
  override table = 'banks';

  constructor() {
    super();
    this.database = inject(AngularFireDatabase);
    this.items = this.database.list(this.table).valueChanges();
  }
}

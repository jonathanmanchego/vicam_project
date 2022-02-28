import { defer, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DatabaseReference } from '@angular/fire/compat/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export abstract class StateService<T>{
  items: Observable<Array<any>> = new Observable<Array<any>>();
  protected table = '';
  database!: AngularFireDatabase;
  observableList(): Observable<any> {
    return this.database.list(this.table).snapshotChanges();
  }
  create(item: T): Observable<any> {
    const tableConnection = this.database.list(this.table);

    return defer(() => from(tableConnection.push(item)));
  }
  update(key: string, newClient: T): Observable<any> {
    const tableConnection = this.database.list(this.table);
    return defer(() => from(tableConnection.set(key, newClient)));
  }
  remove(key: string): Observable<any> {
    const tableConnection = this.database.list(this.table);
    return defer(() => from(tableConnection.remove(key)));
  }
}

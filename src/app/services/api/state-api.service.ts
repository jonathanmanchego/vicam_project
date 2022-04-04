import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModelInterface } from 'src/app/commons/state/interfaces/model-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class StateApiService<Type extends ModelInterface> {
  private map = new Map<number, Type>();
  protected url = '';
  protected http!: HttpClient;
  constructor() {}
  create(item: Type): Observable<Type> {
    return new Observable((observer) => {
      this.http.post(this.url, item).subscribe({
        next: (created: any) => {
          this.map.set(created.id, created);
          observer.next(created);
        },
        complete: () => observer.complete(),
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }
}

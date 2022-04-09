import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModelInterface } from 'src/app/commons/state/interfaces/model-interface';
import { HttpClient } from '@angular/common/http';

interface ResponseArray<Type> {
  status: boolean;
  msg: string;
  data: [Type];
}
interface ResponseCreate<Type> {
  status: boolean;
  msg: string;
  data: Type;
}
@Injectable({
  providedIn: 'root',
})
export abstract class StateApiService<Type extends ModelInterface> {
  private map = new Map<number, Type>();
  protected url = '';
  protected http!: HttpClient;
  private pathBackend = environment.backend;

  getValues(): Array<Type> {
    return Array.from(this.map.values());
  }

  create(item: Type): Observable<Type> {
    return new Observable((observer) => {
      this.http.post(`${this.pathBackend + this.url}`, item).subscribe({
        next: (created: any) => {
          const { data: item } = created as ResponseCreate<Type>;
          this.map.set(item.id, item);
          observer.next(item);
        },
        complete: () => observer.complete(),
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }
  getAll(
    filterParameters: { [key: string]: string } = {}
  ): Observable<Array<Type>> {
    return new Observable((observer) => {
      this.http
        .get(`${this.pathBackend + this.url}`, {
          params: filterParameters,
        })
        .subscribe({
          next: (responseArray: any) => {
            const { data } = responseArray as ResponseArray<Type>;
            for (const item of data) {
              const previous = this.map.get(item.id);
              this.map.set(item.id, { ...previous, ...item });
            }
            observer.next(data);
          },
          complete: () => {
            observer.complete();
          },
          error: (error: any) => {
            observer.error(error);
          },
        });
    });
  }
}

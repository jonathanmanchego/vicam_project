import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  observableLoading = new Subject<boolean>();
  constructor() {}

  startLoading(): void {
    this.observableLoading.next(true);
  }
  stopLoading(): void {
    this.observableLoading.next(false);
  }
}

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Breadcrum {
  label: string;
  link: string | undefined;
  current: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class BreadcrumService {
  observableChangeBreadcrum = new Subject<Breadcrum[]>();
  constructor() {}
  setBreadcrum(breadcrums: Breadcrum[]): void {
    this.observableChangeBreadcrum.next(breadcrums);
  }
}

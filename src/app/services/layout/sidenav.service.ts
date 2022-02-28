import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  sidenavOpen = new Subject<boolean>();

  openSidenav(): void {
    this.sidenavOpen.next(true);
  }

  closeSidenav(): void {
    this.sidenavOpen.next(false);
  }
}

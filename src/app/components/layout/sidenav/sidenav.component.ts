import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidenavService } from 'src/app/services/layout/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  isOpenSidenav = false;
  subscriptionSidenav: Subscription = new Subscription();
  constructor(
    private readonly sidenavService: SidenavService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptionSidenav = this.sidenavService.sidenavOpen.subscribe(
      (status: boolean) => {
        this.isOpenSidenav = status;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscriptionSidenav.unsubscribe();
  }

  goToRoute(path: string): void {
    this.router.navigateByUrl(path);
  }
  toggleMenu(): void {
    if (this.isOpenSidenav) {
      this.sidenavService.closeSidenav();
      return;
    }
    this.sidenavService.openSidenav();
  }
}

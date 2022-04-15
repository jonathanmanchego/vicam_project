import { LoadingService } from './../../../services/layout/loading.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidenavService } from 'src/app/services/layout/sidenav.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Breadcrum,
  BreadcrumService,
} from 'src/app/services/layout/breadcrum.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  isOpenSidenav = false;
  subscriptionSidenav: Subscription = new Subscription();
  subscriptionLoading: Subscription = new Subscription();
  subscriptionBreadcrum: Subscription = new Subscription();
  breadcrums: Breadcrum[] = [
    {
      label: '',
      link: '',
      current: false,
    },
  ];
  constructor(
    private readonly sidenavService: SidenavService,
    private readonly loadingService: LoadingService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly breadcrumService: BreadcrumService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptionSidenav = this.sidenavService.sidenavOpen.subscribe(
      (status: boolean) => {
        this.isOpenSidenav = status;
      }
    );
    this.subscriptionLoading = this.loadingService.observableLoading.subscribe(
      (status: boolean) => {
        if (status) {
          this.ngxSpinnerService.show();
        } else {
          this.ngxSpinnerService.hide();
        }
      }
    );
    this.subscriptionBreadcrum =
      this.breadcrumService.observableChangeBreadcrum.subscribe(
        (breadcrums: Breadcrum[]) => {
          setTimeout(() => {
            this.breadcrums = breadcrums;
          }, 100);
        }
      );
  }
  ngOnDestroy(): void {
    this.subscriptionSidenav.unsubscribe();
    this.subscriptionLoading.unsubscribe();
    this.subscriptionBreadcrum.unsubscribe();
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

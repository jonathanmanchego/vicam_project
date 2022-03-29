import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { SidenavService } from 'src/app/services/layout/sidenav.service';

@Component({
  selector: 'app-toolbar-panel',
  templateUrl: './toolbar-panel.component.html',
  styleUrls: ['./toolbar-panel.component.scss'],
})
export class ToolbarPanelComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<boolean>();
  constructor(
    private readonly sidenavService: SidenavService,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  menuOpenOrClose(): void {
    this.toggleMenu.emit(true);
  }
  logout(): void {
    this.authenticationService.logout();
  }
}

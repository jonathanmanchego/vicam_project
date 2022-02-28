import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidenavService } from 'src/app/services/layout/sidenav.service';

@Component({
  selector: 'app-toolbar-panel',
  templateUrl: './toolbar-panel.component.html',
  styleUrls: ['./toolbar-panel.component.scss'],
})
export class ToolbarPanelComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<boolean>();
  constructor(private readonly sidenavService: SidenavService) {}

  ngOnInit(): void {}

  menuOpenOrClose(): void {
    this.toggleMenu.emit(true);
  }
}

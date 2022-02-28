import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarPanelComponent } from './toolbar-panel/toolbar-panel.component';

const MaterialModules = [
  MatSidenavModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatListModule,
];

const components = [SidenavComponent, ToolbarPanelComponent];
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ...MaterialModules,
  ],
  exports: components,
})
export class LayoutModule {}

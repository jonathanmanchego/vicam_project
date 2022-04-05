import { MatTooltipModule } from '@angular/material/tooltip';
import { PanelComponentsModule } from './components/panel-components/panel-components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularFireModule } from '@angular/fire/compat';
import { LayoutModule } from './components/layout/layout.module';
import { PageComponentModule } from './page-component/page-component.module';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

const MaterialModules = [
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatTooltipModule,
  MatMenuModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    PageComponentModule,
    LayoutModule,
    PanelComponentsModule,
    NgChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponentsRoutingModule } from './auth-components-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthComponentsRoutingModule
  ]
})
export class AuthComponentsModule { }

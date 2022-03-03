import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponentsRoutingModule } from './auth-components-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const materialComponents = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthComponentsRoutingModule,
    ...materialComponents,
    ReactiveFormsModule,
  ],
})
export class AuthComponentsModule {}

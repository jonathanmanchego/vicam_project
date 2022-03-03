import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    user: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  isPasswordVisible = false;
  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.authenticationService.authenticate();
    this.router.navigateByUrl('/');
  }

  toggleVisiblePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}

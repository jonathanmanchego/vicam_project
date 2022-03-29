import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  formLogin = new FormGroup({
    user: new FormControl('', [Validators.email, Validators.required]),
  });
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  recoverPassword(): void {}

  back(): void {
    this.router.navigate(['users/login/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  formLogin = new FormGroup({
    user: new FormControl('', [Validators.email, Validators.required]),
  });
  constructor() {}

  ngOnInit(): void {}

  recoverPassword(): void {}
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = true;
  constructor(private readonly router: Router) {}
  authenticate(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/users/login']);
  }
}

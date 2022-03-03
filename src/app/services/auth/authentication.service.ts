import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = false;
  authenticate(): void {
    this.isAuthenticated = true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  async canActivate(): Promise<boolean> {
    if (!this.authService.isLoggedIn()) {
      try {
        await this.authService.refreshToken();
      } catch (err) {
        await this.authService.logout();
        return false;
      }
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  async canActivate(): Promise<boolean> {
    if (!this.authService.isLoggedIn()) {
      try {
        await this.authService.refreshToken();
      } catch (err) {
        return true;
      }
    }
    await this.navCtrl.navigateRoot(['/dashboard']);
    return false;
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { showActionSheetModal } from 'src/app/helpers/show-action-sheet-modal';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  me!: User;
  counter = 0;
  appVersion = environment.version;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getMe();
  }

  async getMe(): Promise<void> {
    try {
      this.me = await this.userService.me();
    } catch (err) {
      console.error(err);
    }
  }

  async triggerAdmin(): Promise<void> {
    this.counter++;
    if (this.me.role === 'ADMIN' && this.counter === 6) {
      const toast = await this.toastCtrl.create({
        header: 'God mode',
        message: 'You\'re one tap away from god mode !',
        icon: 'terminal',
        cssClass: 'custom-toast secondary-white',
        duration: 500,
      });
      toast.addEventListener('click', () => toast.dismiss());
      await toast.present();
    } else if (this.me.role === 'ADMIN' && this.counter >= 7) {
      await this.navigate('/admin');
      this.counter = 0;
    } else if (this.me.role !== 'ADMIN') {
      this.counter = 0;
    }
  }

  async onLogout(): Promise<void> {
    console.log('test');
    await showActionSheetModal(
      this.modalCtrl,
      'You\'re about to leave',
      'Are you sure you wanna logout from your account ?',
      'danger',
      'Logout',
      'Cancel',
      this.me,
      async () => await this.logout(),
    );
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  async navigate(route: string): Promise<void> {
    await this.navCtrl.navigateForward([route]);
  }

}

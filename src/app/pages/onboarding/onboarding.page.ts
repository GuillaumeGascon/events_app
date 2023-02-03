import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {

  appName = environment.name;

  constructor(
    private navCtrl: NavController
  ) { }

  async navigate(route: string): Promise<void> {
    await this.navCtrl.navigateForward([route]);
  }

}

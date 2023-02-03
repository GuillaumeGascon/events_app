import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AnimationOptions } from 'ngx-lottie';
import { random } from 'src/app/helpers/randomIntFromRange';
import { showErrorToast } from 'src/app/helpers/show-error-toast';
import { AuthService, error } from 'src/app/services/auth.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  isLoading!: boolean;
  appName = environment.name;

  options: AnimationOptions = {
    path: '/assets/lottie/info.json',
    autoplay: false,
    loop: 0,
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private registrationService: RegistrationService,
    private translateService: TranslateService,
  ) { }

  async login(): Promise<void> {
    this.isLoading = true;
    try {
      const email = this.email.value;
      const password = this.password.value;
      await this.authService.login(email, password);
      await this.navCtrl.navigateForward(['/dashboard'], { replaceUrl: true });
    } catch (err: any) {
      if (err.error && err.error.code) {
        if (err.error.code === error.USER_NOT_FOUND) {
          const code = random(100000, 999999).toString();
          this.registrationService.setCode(code);
          this.registrationService.setEmail(this.email.value);
          await this.authService.sendVerificationCode(this.email.value, code);
          await this.navCtrl.navigateForward(['/register']);
        } else {
          console.error(err.error.message);
          await showErrorToast(this.translateService, this.toastCtrl, err);
        }
      } else {
        const unknow = {
          error: {
            translation: 'error.unknow',
            message: 'Unkown error',
            code: error.ERROR_DEFAULT
          }
        }
        await showErrorToast(this.translateService, this.toastCtrl, unknow);
      }
    }
    this.isLoading = false;
  }

}

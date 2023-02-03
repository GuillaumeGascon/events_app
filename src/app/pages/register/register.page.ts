import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { random } from 'src/app/helpers/randomIntFromRange';
import { passwordRegexp } from 'src/app/helpers/regexp';
import { passwordValidator } from 'src/app/helpers/validators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('swiper') swiper!: SwiperComponent;

  isLoading!: boolean;
  length!: number
  currentIndex!: number;
  email!: string;
  verificationCode!: string;
  canAskNewCode!: boolean;

  timeout!: NodeJS.Timeout;

  //error
  codeError: string | null = null;
  passwordError: string | null = null;
  repeatPasswordError: string | null = null;

  slideOptions: SwiperOptions = {
    allowTouchMove: false,
    slidesPerView: 1,
    spaceBetween: 16,
    initialSlide: 0
  };

  verificationCodeForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/[0-9]{6}/)]]
  });

  passwordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, passwordValidator]],
    repeatPassword: ['', [Validators.required, passwordValidator]]
  });

  userInformationsForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]]
  });

  get code(): FormControl {
    return this.verificationCodeForm.get('code') as FormControl;
  }

  get password(): FormControl {
    return this.passwordForm.get('password') as FormControl;
  }

  get repeatPassword(): FormControl {
    return this.passwordForm.get('repeatPassword') as FormControl;
  }

  get userName(): FormControl {
    return this.userInformationsForm.get('userName') as FormControl;
  }

  get firstName(): FormControl {
    return this.userInformationsForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.userInformationsForm.get('lastName') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private registrationService: RegistrationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    const code = this.registrationService.getCode();
    if (code) {
      this.verificationCode = code;
    }
    const email = this.registrationService.getEmail();
    if (email) {
      this.email = email;
    }
    this.timeout = setTimeout(() => {
      this.canAskNewCode = true;
    }, 60000);
  }

  ngAfterViewInit() {
    this.getSliderLength();
    this.getCurrentIndex();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  counter(n: number): any {
    return new Array(n);
  }

  getCurrentIndex(): void {
    this.currentIndex = this.swiper.swiperRef.activeIndex;
  }

  getSliderLength(): void {
    this.length = this.swiper.swiperRef.wrapperEl.children.length;
  }

  async next(): Promise<void> {
    const errorMessage: any = await this.translateService.get([
      'pages.register.code.codeError',
      'pages.register.password.passwordError',
      'pages.register.password.repeatPasswordError'
    ]).toPromise();
    if (this.currentIndex === 0){
      if (this.checkVerificationCode()) {
        this.codeError = null;
        this.slideNext();
      } else {
        this.codeError = errorMessage['pages.register.code.codeError'];
      }
    } else if (this.currentIndex === 1) {
      if (passwordRegexp.test(this.password.value)) {
        this.passwordError = null;
        if (this.password.value === this.repeatPassword.value) {
          this.repeatPasswordError = null;
          this.registrationService.setPassword(this.password.value);
          this.slideNext();
        } else {
          this.repeatPasswordError = errorMessage['pages.register.password.repeatPasswordError'];
        }
      } else {
        this.passwordError = errorMessage['pages.register.password.passwordError'];
      }
    } else if (this.currentIndex === 2) {
      if (this.userInformationsForm.valid) {
        const user: User = {
          userName: this.userName.value,
          firstName: this.firstName.value,
          lastName: this.lastName.value
        }
        this.registrationService.setUser(user);
        try {
          console.log('KweuKouuuuu');
          const finalUser = this.registrationService.getUser();
          if (finalUser) {
            await this.authService.register(finalUser);
            await this.navCtrl.navigateForward(['/dashboard'], { replaceUrl: true });
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
    this.changeDetectorRef.detectChanges();
  }

  async sendVerificationCode(): Promise<void> {
    this.isLoading = true;
    try {
      const code = random(100000, 999999).toString();
      this .verificationCode = code;
      this.registrationService.setCode(code);
      await this.authService.sendVerificationCode(this.email, code);
      this.timeout = setTimeout(() => {
        this.canAskNewCode = true;
      }, 60000);
    } catch (err) {
      console.error(err);
    }
    this.isLoading = false;
  }

  checkVerificationCode(): boolean {
    return this.verificationCode === this.code.value;
  }

  slideNext(): void {
    this.swiper.swiperRef.slideNext();
    this.getCurrentIndex();
  }

  slidePrev(): void {
    this.swiper.swiperRef.slidePrev();
    this.getCurrentIndex();
  }

}

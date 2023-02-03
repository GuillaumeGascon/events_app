import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';
import { SharedModule } from 'src/app/shared.module';
import { OnboardingPage } from './onboarding.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingPage
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
  ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}

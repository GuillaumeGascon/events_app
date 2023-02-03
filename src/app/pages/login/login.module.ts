import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';
import { SharedModule } from 'src/app/shared.module';
import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LottieModule } from 'ngx-lottie';
import { ButtonBaseComponent } from './button-base/button-base.component';
import { ButtonTransparentComponent } from './button-transparent/button-transparent.component';
import { IconButtonComponent } from './icon-button/icon-button.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LottieModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ButtonBaseComponent,
    ButtonTransparentComponent,
    IconButtonComponent,
  ],
  exports: [
    ButtonBaseComponent,
    ButtonTransparentComponent,
    IconButtonComponent
  ]
})

export class ButtonsModule { }

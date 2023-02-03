import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonsModule } from '../buttons/buttons.module';
import { Base64Component } from './base64/base64.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    IonicModule,
  ],
  declarations: [
    Base64Component,
  ],
  exports: [
    Base64Component
  ]
})

export class ImagesModule { }

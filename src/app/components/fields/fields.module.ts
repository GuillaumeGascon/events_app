import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LottieModule } from 'ngx-lottie';
import { ButtonsModule } from '../buttons/buttons.module';
import { TextFieldsComponent } from './text-fields/text-fields.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    IonicModule,
    LottieModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TextFieldsComponent
  ],
  exports: [
    TextFieldsComponent
  ]
})

export class FieldsModule { }

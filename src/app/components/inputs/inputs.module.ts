import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonsModule } from '../buttons/buttons.module';
import { CodeInputComponent } from './code-input/code-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { EmailInputComponent } from './email-input/email-input.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CodeInputComponent,
    DateInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    TextInputComponent,
  ],
  exports: [
    CodeInputComponent,
    DateInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    TextInputComponent,
  ]
})

export class InputsModule { }

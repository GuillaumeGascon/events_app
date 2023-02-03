import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { ButtonsModule } from '../buttons/buttons.module';
import { CardsModule } from '../cards/cards.module';
import { ComponentsModule } from '../components.module';
import { InputsModule } from '../inputs/inputs.module';
import { ActionSheetModalComponent } from './action-sheet-modal/action-sheet-modal.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    InputsModule,
    SwiperModule,
    CardsModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    ActionSheetModalComponent,
  ],
  exports: [
    ActionSheetModalComponent,
  ]
})

export class ModalsModule { }

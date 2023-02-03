import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonsModule } from './components/buttons/buttons.module';
import { CardsModule } from './components/cards/cards.module';
import { ComponentsModule } from './components/components.module';
import { FieldsModule } from './components/fields/fields.module';
import { ImagesModule } from './components/images/images.module';
import { InputsModule } from './components/inputs/inputs.module';
import { ModalsModule } from './components/modals/modals.module';
import { SkeletonsModule } from './components/skeletons/skeletons.module';

@NgModule({
  imports: SharedModule.MODULES,
  exports: SharedModule.MODULES
})
export class SharedModule {
  static readonly MODULES = [
    ButtonsModule,
    CardsModule,
    CommonModule,
    ComponentsModule,
    FieldsModule,
    ImagesModule,
    InputsModule,
    IonicModule,
    ModalsModule,
    SkeletonsModule,
  ];
}

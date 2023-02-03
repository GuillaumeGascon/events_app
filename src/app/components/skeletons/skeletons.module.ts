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
import { EventCardSkeletonComponent } from './event-card-skeleton/event-card-skeleton.component';
import { EventListCardSkeletonComponent } from './event-list-card-skeleton/event-list-card-skeleton.component';
import { FieldSkeletonComponent } from './field-skeleton/field-skeleton.component';
import { ProfileCardSkeletonComponent } from './profile-card-skeleton/profile-card-skeleton.component';

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
    EventCardSkeletonComponent,
    EventListCardSkeletonComponent,
    FieldSkeletonComponent,
    ProfileCardSkeletonComponent,
  ],
  exports: [
    EventCardSkeletonComponent,
    EventListCardSkeletonComponent,
    FieldSkeletonComponent,
    ProfileCardSkeletonComponent,
  ]
})

export class SkeletonsModule { }

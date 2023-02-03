import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonsModule } from '../buttons/buttons.module';
import { ImagesModule } from '../images/images.module';
import { EventCardComponent } from './event-card/event-card.component';
import { EventListCardComponent } from './event-list-card/event-list-card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    ImagesModule,
    IonicModule,
  ],
  declarations: [
    EventCardComponent,
    EventListCardComponent,
    ProfileCardComponent,
  ],
  exports: [
    EventCardComponent,
    EventListCardComponent,
    ProfileCardComponent,
  ]
})

export class CardsModule { }

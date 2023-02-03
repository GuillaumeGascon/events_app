import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';
import { SwiperModule } from 'swiper/angular';
import { AddEventPage } from './add-event.page';

const routes: Routes = [
  {
    path: '',
    component: AddEventPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SwiperModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddEventPage]
})
export class AddEventPageModule {}

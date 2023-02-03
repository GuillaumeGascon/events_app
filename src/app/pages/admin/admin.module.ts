import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LottieModule } from 'ngx-lottie';
import { SharedModule } from 'src/app/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule,
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [AdminPage]
})
export class AdminPageModule { }

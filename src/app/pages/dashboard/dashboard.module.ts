import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LottieModule } from 'ngx-lottie';
import { SharedModule } from 'src/app/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule,
    SharedModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule { }

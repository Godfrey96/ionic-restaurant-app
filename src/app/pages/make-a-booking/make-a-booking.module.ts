import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeABookingPageRoutingModule } from './make-a-booking-routing.module';

import { MakeABookingPage } from './make-a-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MakeABookingPageRoutingModule
  ],
  declarations: [MakeABookingPage]
})
export class MakeABookingPageModule {}

import { UserModalComponent } from './../user-modal/user-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBookingPageRoutingModule } from './user-booking-routing.module';

import { UserBookingPage } from './user-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserBookingPageRoutingModule
  ],
  declarations: [UserBookingPage, UserModalComponent],
  entryComponents:[UserModalComponent]
})
export class UserBookingPageModule {}

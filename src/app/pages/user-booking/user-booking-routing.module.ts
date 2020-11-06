import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBookingPage } from './user-booking.page';

const routes: Routes = [
  {
    path: '',
    component: UserBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBookingPageRoutingModule {}

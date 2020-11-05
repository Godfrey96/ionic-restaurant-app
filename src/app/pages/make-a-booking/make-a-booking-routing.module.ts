import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeABookingPage } from './make-a-booking.page';

const routes: Routes = [
  {
    path: '',
    component: MakeABookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeABookingPageRoutingModule {}

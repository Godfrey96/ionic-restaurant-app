import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRestaurantPage } from './view-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRestaurantPageRoutingModule {}

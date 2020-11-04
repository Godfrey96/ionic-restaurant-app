import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRestaurantPageRoutingModule } from './view-restaurant-routing.module';

import { ViewRestaurantPage } from './view-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRestaurantPageRoutingModule
  ],
  declarations: [ViewRestaurantPage]
})
export class ViewRestaurantPageModule {}

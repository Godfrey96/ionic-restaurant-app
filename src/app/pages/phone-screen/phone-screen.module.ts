import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneScreenPageRoutingModule } from './phone-screen-routing.module';

import { PhoneScreenPage } from './phone-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneScreenPageRoutingModule
  ],
  declarations: [PhoneScreenPage]
})
export class PhoneScreenPageModule {}

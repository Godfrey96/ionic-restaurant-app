import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneScreenPage } from './phone-screen.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneScreenPageRoutingModule {}

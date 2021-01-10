import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReviewsPage } from './view-reviews.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReviewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReviewsPageRoutingModule {}

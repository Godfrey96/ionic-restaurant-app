import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPagePage } from './landing-page.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPagePage
  },
  {
    path: 'search-page',
    loadChildren: () => import('./search-page/search-page.module').then( m => m.SearchPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPagePageRoutingModule {}

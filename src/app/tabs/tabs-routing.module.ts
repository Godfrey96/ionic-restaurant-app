import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'landing-page',
        loadChildren: () => import('../pages/landing-page/landing-page.module').then( m => m.LandingPagePageModule)
      },
      {
        path: 'user-booking',
        loadChildren: () => import('../pages/user-booking/user-booking.module').then( m => m.UserBookingPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../pages/search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../pages/user-profile/user-profile.module').then(m => m.UserProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/landing-page',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }

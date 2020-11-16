import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import { NavController } from '@ionic/angular';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
              private restaurantService: RestaurantsService,
              private nav: NavController
  ) { }

  ngOnInit() {
  }

  logout(){
    this.restaurantService.logoutOwner();
    this.restaurantService.signAuth();
    this.nav.navigateRoot('/phone-screen')
  }

}

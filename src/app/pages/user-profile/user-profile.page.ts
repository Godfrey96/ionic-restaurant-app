import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestaurantsService } from 'src/app/services/restaurants.service';

import firebase  from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  profile: any;

  constructor(
              private restaurantService: RestaurantsService,
              private nav: NavController
  ) { }

  ngOnInit() {
    let user = firebase.auth().currentUser.uid
    console.log('User: ', user)

    firebase.firestore().collection('users').doc(user).get().then(snapshot => {
      this.profile = snapshot.data();
      console.log('new data: ', this.profile)
    })
  }

  logout(){
    this.restaurantService.logoutOwner();
    this.restaurantService.signAuth();
    this.nav.navigateRoot('/phone-screen')
  }

}

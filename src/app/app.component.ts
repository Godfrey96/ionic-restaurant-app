import { RestaurantsService } from './services/restaurants.service';
import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
// require('firebase/app');


const firebaseConfig = {
  apiKey: "AIzaSyDTvKMZJccu0P2x3PZCXiCkf9R3Fn58mx4",
  authDomain: "ionic-restaurant-d4af9.firebaseapp.com",
  databaseURL: "https://ionic-restaurant-d4af9.firebaseio.com",
  projectId: "ionic-restaurant-d4af9",
  storageBucket: "ionic-restaurant-d4af9.appspot.com",
  messagingSenderId: "788766068469",
  appId: "1:788766068469:web:7fa2cde3d1eb233bb7bfbc",
  measurementId: "G-0VWW908GMC"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  profile: any;
  name: string;
  phoneNumber: string;
  dp: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private restaurantService: RestaurantsService,
    private nav: NavController
  ) {
    this.initializeApp();
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    this.name = localStorage.getItem("name");
    this.phoneNumber = localStorage.getItem("phoneNumber");
    this.dp = "https://ui-avatars.com/api/?background=ff7f50" + "&color=ffffff&size=128&bold=true&name=" + this.name;

  }

  ngOnInit(){
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.restaurantService.logoutOwner();
    this.restaurantService.signAuth();
    this.nav.navigateRoot('/phone-screen')
  }
}

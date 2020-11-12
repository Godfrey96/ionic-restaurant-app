import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { RestaurantsService } from '../../services/restaurants.service'

import firebase from 'firebase/app';
import 'firebase/firestore'
// import { MenuController } from '@ionic/angular';
// require('firebase/firestore');


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  restaurants: Array<any> = [];
  // restaurants: any;
  id: any;

  slideOpts = {
    initialSlide: 0,
    autoplay: true,
    speed: 1000
  };


  constructor() { }

  ngOnInit() {
    firebase.firestore().collection('restaurants').onSnapshot(res => {
      res.forEach(element => {
        this.restaurants.push(element.data());
      });
    });
  }

}

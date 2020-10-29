import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { RestaurantsService } from '../../services/restaurants.service'

import  firebase  from 'firebase/app';
require('firebase/firestore');


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  restaurants = [];

  constructor(private restaurantService: RestaurantsService) { }

  ngOnInit() {
    firebase.firestore().collection('restaurants').onSnapshot(res => {
      res.forEach(element => {
        this.restaurants.push(element.data());
      })
    })
    
    // this.restaurants = this.restaurantService.getAllRestaurants();
  }

}

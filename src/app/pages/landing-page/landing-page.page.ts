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
  loadedRestaurants: Array<any> = [];
  // restaurants: any;
  id: any;
  searchText: string;

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
        this.loadedRestaurants = this.restaurants
        console.log('List of resta: ', this.loadedRestaurants)
      });
    });
  }

  initializeItems(): void{
    this.restaurants = this.loadedRestaurants;
  }

  filterList(evt){
    this.initializeItems();

    const searchTerm = evt.srcElement.value;

    if(!searchTerm){
      return;
    }

    this.restaurants = this.restaurants.filter(currentRest => {
      if(currentRest.resName && searchTerm){
        if(currentRest.resName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    })
  }

}

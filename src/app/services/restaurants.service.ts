import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
require('firebase/firestore');

import { Restaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  restaurants = [];

  // private restaurants: Restaurant[] = [
  //   {
  //     Rname: "Godfrey's Restaurant",
  //     imgUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190509-lamb-burger-349-1558039574.jpg",
  //     location: "DiepKloof",
  //     menu: "King Burger",
  //     rating: 4,
  //     reviews: 215
  //   },
  //   {
  //     Rname: "Julius's Restaurant",
  //     imgUrl: "https://www.eatout.co.za/wp-content/uploads/2016/12/Kota.jpg",
  //     location: "Protea glen",
  //     menu: "King Burger",
  //     rating: 5.7,
  //     reviews: 255
  //   },
  //   {
  //     Rname: "Ngwatle's Restaurant",
  //     imgUrl: "https://i2.wp.com/foodeely.com/wp-content/uploads/2020/02/African-Foods.jpg?fit=795%2C498&ssl=1",
  //     location: "Orlando",
  //     menu: "African food",
  //     rating: 5.2,
  //     reviews: 275
  //   },
  // ]

  constructor() { }

  getAllRestaurants(){
    // firebase.firestore().collection('restaurants').onSnapshot(res => {
    //   res.forEach(element => {
    //     this.restaurants.push(element.data());
    //   })
    // })
    // return [...this.restaurants]
  }
}

import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore'
// require('firebase/firestore');

import { Restaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  //restaurants: Array<any> = [];
  restaurants: any;

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

  // getAllRestaurants(restaurant){
    // firebase.firestore().collection('restaurants').onSnapshot(res => {
    //   res.forEach(element => {
    //     this.restaurants.push(element.data());
    //   })
    // })
    // return [...this.restaurants]
  //   const query = firebase.firestore().collection('restaurants');
  //   this.getDocumentsInQuery(query, restaurant)
  // }

  // getDocumentsInQuery(query, restaurant){
  //   query.onSnapshot(function(snapshot){
  //     if(!snapshot.size) return restaurant.empty();
  //     snapshot.docChanges().forEach(function(change){
  //       if(change.type === 'removed'){
  //         restaurant.remove(change.doc);
  //       }else{
  //         restaurant.display(change.doc);
  //       }
  //     });
  //   });
  // }


  getRestaurantById(id){
    return firebase.firestore().collection('restaurants').doc(id).get()
  }
}

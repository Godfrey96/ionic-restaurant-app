import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
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

  signAuth(){
    return firebase.auth().onAuthStateChanged(user => {
     if(user){
      //  const email = user.email;
      //  this.setSession(email);
       console.log('user logged in: ', user);
     }else{
       console.log('user logged out')
     }
    });
  }

  // Register new user
  registerUser() {
    return firebase.firestore().collection('users');
  }

  // Make a booking
  booking() {
    return firebase.firestore().collection('restaurants');
  }

  //logout users
  logoutOwner(){
    return firebase.auth().signOut();
  }

  bookingStatus(ownerId, userId, value){
    var db = firebase.firestore();
    var restaurantRef = db.collection('restaurants').doc(ownerId);

    var restaurant = Promise.all([
      restaurantRef.collection('bookings').doc(userId).set({
        status: value
      }, { merge: true }).then(a => {
        console.log('Changed')
      })
    ])
  }
}

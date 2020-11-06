import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { RestaurantsService } from '../../services/restaurants.service'

import firebase from 'firebase/app';
import 'firebase/firestore'
import { MenuController } from '@ionic/angular';
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


  constructor(private restaurantService: RestaurantsService, private menuCtrl: MenuController) { }

  ngOnInit() {
    firebase.firestore().collection('restaurants').onSnapshot(res => {
      res.forEach(element => {
        this.restaurants.push(element.data());
      });
    });
    

    // firebase.firestore().collection('restaurants').doc().get().then(function (doc) {
    //   if (doc.exists) {
    //     console.log("Document data: ", doc.data());
    //   } else {
    //     console.log("No such documents");
    //   }
    // }).catch(function (error) {
    //   console.log("Error getting document: ", error);
    // });

    // firebase.firestore().collection('restaurants').get().then(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     this.restaurants.push(doc.data());
    //     console.log(doc.data())
    //   });
    // });
    // this.restaurants = this.restaurantService.getAllRestaurants();
  }

}

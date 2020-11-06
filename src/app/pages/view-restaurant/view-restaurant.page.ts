import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.page.html',
  styleUrls: ['./view-restaurant.page.scss'],
})
export class ViewRestaurantPage implements OnInit {
  uid = this.activatedActivated.snapshot.params.id;
  //id: any;
  // resDetails: any = {};
  // res: any = {};
  id: any;
  array: any = []
  array1: any = []
  arrayReviews: any = []
  restaurants: any = [];
  menu: any;

  name: string;
  phoneNumber: string;
  dp: string;

  constructor(
    public nav: NavController,
    private activatedActivated: ActivatedRoute,
    private restaurantService: RestaurantsService
    // public navParams: NavParams
  ) {
    this.name = localStorage.getItem("name");
    this.phoneNumber = localStorage.getItem("phoneNumber");
    this.dp = "https://ui-avatars.com/api/?background=ff7f50" + "&color=ffffff&size=128&bold=true&name=" + this.name;
    console.log('username: ', name)
  }

  ngOnInit() {

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    console.log(this.uid)

    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurants = snapshot.data();
      console.log('new data: ', this.restaurants)
    });

    // Fetching menus
    firebase.firestore().collection('restaurants').doc(this.uid).collection('menu').where('ownerId', '==', this.uid).limit(3).get().then(snapshot => {
      snapshot.docs.forEach(menu => {
        this.array1.push(menu.data())
        console.log('menu: ', this.array1)
      })
    })

    // Fetching reviews
    firebase.firestore().collection('restaurants').doc(this.uid).collection('reviews').where('ownerId', '==', this.uid).get().then(snapshot => {
      snapshot.docs.forEach(review => {
        this.arrayReviews.push(review.data());
        console.log('reviews new data: ', this.arrayReviews)
      })
    });

  }

  btnBook() {
    this.nav.navigateRoot('/make-a-booking')
  }

}

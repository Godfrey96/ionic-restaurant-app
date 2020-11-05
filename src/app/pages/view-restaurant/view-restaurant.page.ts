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
  array:any=[]
  array1:any=[]
  restaurants: any;
  menu: any;

  constructor(
    public nav: NavController,
    private activatedActivated: ActivatedRoute,
    private restaurantService: RestaurantsService
    // public navParams: NavParams
  ) { }

  ngOnInit() {

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    console.log(this.uid)

    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurants = snapshot.data();
      console.log('new data: ', this.restaurants)
    });

    // firebase.firestore().collection('restaurants').where('ownerId', '==', this.uid).get().then(snapshot => {
    //   snapshot.docs.forEach(restaurant => {
    //      this.array.push( restaurant.data())
    //     console.log('res: ',this.array)
    //   })
    // })


    // this.id = this.activatedActivated.snapshot.paramMap.get('id')
    // console.log('ID: ', this.id)
    // console.log(this.uid)

    firebase.firestore().collection('restaurants').doc(this.uid).collection('menu').where('ownerId', '==', this.uid).limit(3).get().then(snapshot => {
      snapshot.docs.forEach(menu => {
         this.array1.push( menu.data())
        console.log('menu: ',this.array1)
      })
    })

  }

  btnBook(){
    this.nav.navigateRoot('/make-a-booking')
  }

}

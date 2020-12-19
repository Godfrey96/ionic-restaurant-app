import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';

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
  name: any;
  array: any = []
  arrayMenus: Array<any> = [];
  arrayReviews: Array<any> = [];
  restaurants: any = [];
  profile: any
  restArrays: Array<any> = [];
  restId: any;
  firstName: any;
  lastName: any;
  selectedColor: boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public nav: NavController,
    private activatedActivated: ActivatedRoute,
    private restaurantService: RestaurantsService
    // public navParams: NavParams
  ) { }

  ngOnInit() {

    console.log('COLOR: ', this.selectedColor)
    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    // fetching single restaurant
    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurants = snapshot.data();
      console.log('new data: ', this.restaurants)
    });

    // fetching all restaurants
    firebase.firestore().collection('restaurants').onSnapshot(res => {
      res.forEach(element => {
        this.restArrays.push(Object.assign(element.data(), { uid: element.id }));
        this.restId = { uid: element.id }.uid

        // Fetching menus
        firebase.firestore().collection('restaurants').doc(this.restId).collection('menu').limit(3).onSnapshot(res => {
          res.forEach(doc => {
            this.arrayMenus.push(doc.data())
          })
        })

        // Fetching reviews
        firebase.firestore().collection('restaurants').doc(this.restId).collection('reviews').limit(3).onSnapshot(res => {
          res.forEach(doc => {
            this.arrayReviews.push(doc.data());
            this.firstName = doc.get('firstName');
            this.lastName = doc.get('lastName');
            
          })
        })
      });
    });

    let user = firebase.auth().currentUser.uid

    //Fetching user
    firebase.firestore().collection('users').doc(user).get().then(snapshot => {
      this.profile = snapshot.data();
      console.log('new profile: ', this.profile)
    })

  }

  addToFavorite(restId){
    if(this.selectedColor){
      firebase.firestore().collection('favorites').doc(restId).set({
        restId: this.id
      }, { merge: true }).then(res => {
        this.selectedColor = false;
        console.log('ADDED TO FAVORITES: ', this.restId)
      });
    }
  }

  deleteToFavorite(restId){
    if(!this.selectedColor){
      firebase.firestore().collection('favorites').doc(restId).delete().then(res => {
        console.log('DELETED: ', this.restId)
        this.selectedColor = true
      })
    }
  }


  async btnBook() {

    const loading = await this.loadingCtrl.create();

    this.nav.navigateRoot('/make-a-booking')

    return await loading.present();
  }

}

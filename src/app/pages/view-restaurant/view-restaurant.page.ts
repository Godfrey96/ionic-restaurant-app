import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  listReviews: Array<any> = [];
  restaurants: any = [];
  profile: any
  restArrays: Array<any> = [];
  restId: any;
  firstName: any;
  lastName: any;

  reviewSize: number = 0;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public nav: NavController,
    private activatedActivated: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantsService
    // public navParams: NavParams
  ) { }

  ngOnInit() {

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    firebase.auth().onAuthStateChanged((user) => {
      if(user){

        // fetching single restaurant
    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurants = snapshot.data();
      console.log('view restaurant: ', this.restaurants)
    });

     // Fetching menus
     firebase.firestore().collection('restaurants').doc(this.id).collection('menu').limit(3).onSnapshot(res => {
      res.forEach(doc => {
        this.arrayMenus.push(doc.data())
      })
    })

    // Fetching reviews
    firebase.firestore().collection('restaurants').doc(this.id).collection('reviews').limit(3).orderBy('createdAt','desc').onSnapshot(res => {
      res.forEach(doc => {
        this.arrayReviews.push(doc.data());
        // this.reviewSize = (this.arrayReviews).length
        this.firstName = doc.get('firstName');
        this.lastName = doc.get('lastName');
      });
    });

    // Fetching reviews
    firebase.firestore().collection('restaurants').doc(this.id).collection('reviews').orderBy('createdAt','desc').onSnapshot(res => {
      res.forEach(doc => {
        this.listReviews.push(doc.data());
        this.reviewSize = (this.listReviews).length
        // this.firstName = doc.get('firstName');
        // this.lastName = doc.get('lastName');
      });
    });

    let user = firebase.auth().currentUser.uid

    //Fetching user
    firebase.firestore().collection('users').doc(user).get().then(snapshot => {
      this.profile = snapshot.data();
      console.log('new profile: ', this.profile)
    })

      }else{
        console.log('not logged in')
      }
    })

  }

  viewReviews(){
    this.router.navigate(['/view-reviews', this.id]);
  }

  async btnBook() {

    const loading = await this.loadingCtrl.create();

    this.nav.navigateRoot('/make-a-booking')

    return await loading.present();
  }

}

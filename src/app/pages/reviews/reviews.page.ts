import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  reviewForm: FormGroup;
  uid = this.activatedRoute.snapshot.params.id;
  userId: any;
  ownerId: any;
  id: any;
  restaurants: Array<any> = [];
  restaurant: any
  profile: any
  firstName: any
  lastName: any
  rests: any
  resName: any
  reviewId: any;

  constructor(
            public loadingCtrl: LoadingController,
            public alertCtrl: AlertController,
            private restaurantService: RestaurantsService, 
            private fb: FormBuilder,
            private activatedRoute: ActivatedRoute,
            private nav: NavController,
            private router: Router
    ) { }

  ngOnInit() {
    this.restaurantService.signAuth();
    this.addReview();

    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    //fecthing all restaurants
    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurant = snapshot.data();
      console.log('new data: ', this.restaurant)
    });

    // this.id = this.activatedActivated.snapshot.paramMap.get('id')
    // console.log('ID: ', this.id)
    // //console.log(this.uid)

    // // fetching single restaurant
    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.rests = snapshot.data();
      console.log('new data: ', this.restaurants)
      this.resName = snapshot.get('resName');
      console.log('resName: ', this.resName)
    });


    let user = firebase.auth().currentUser.uid
    console.log('User: ', user)

    //Fetching user
    firebase.firestore().collection('users').doc(user).get().then(snapshot => {
      this.profile = snapshot.data();
      console.log('new data: ', this.profile)
      this.firstName = snapshot.get('firstName')
      this.lastName = snapshot.get('lastName')
      console.log('name: ', this.firstName)
    })
    
  }

  addReview(){
    this.reviewForm = this.fb.group({
      review: ['', Validators.required]
    });
  }

  async reviewSubmit(){
    // const user = firebase.auth().currentUser.uid
    // this.userId = user;

    // this.ownerId = this.id

    const alert = await this.alertCtrl.create({

      message: `Thank you for submitting your review, please click Okay to see your booking details.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {

            var user = firebase.auth().currentUser;
            this.userId = user.uid;
            console.log('userId: ', this.userId);
            this.ownerId = this.uid;
            console.log('Owner Id: ', this.ownerId)

            firebase.firestore().collection('restaurants').doc(this.id).collection('reviews').add({
                restId: this.id,
                userId: this.userId,
                firstName: this.firstName,
                lastName: this.lastName,
                review: this.reviewForm.value.review,
                createdAt: new Date()
            }).then((doc) => {
              doc.set({ reviewId: doc.id }, { merge: true }).then(() => {
                console.log('REVIEW ID: ', this.reviewId)
              })
              this.nav.navigateRoot('/user-booking')
              this.reviewForm.reset();
            }).catch(function (error) {
              console.log(error)
            })
          },
        },
      ],
    });
    return await alert.present();



    // firebase.firestore().collection('restaurants').doc(this.id).collection('reviews').add({
    //   ownerId: this.id,
    //   userId: this.userId,
    //   review: this.reviewForm.value.review,
    //   createdAt: Date.now()
    // }).then(function(docRef){
    //   console.log("Document booking: ", docRef);
    // }).catch(function(error){
    //   console.log(error);
    // });
    // //this.nav.navigateRoot('/user-booking')
    // this.nav.navigateRoot('/user-booking/'+this.ownerId)
    // this.reviewForm.reset();
  }

}

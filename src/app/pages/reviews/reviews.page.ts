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
  name: any

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

    let user = firebase.auth().currentUser.uid
    console.log('User: ', user)

    //Fetching user
    firebase.firestore().collection('users').doc(user).get().then(snapshot => {
      this.profile = snapshot.data();
      console.log('new data: ', this.profile)
      this.name = snapshot.get('name')
      console.log('name: ', this.name)
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
                ownerId: this.id,
                userId: this.userId,
                name: this.name,
                review: this.reviewForm.value.review,
                createdAt: new Date()
            }).then(() => {
              // this.nav.navigateRoot('/user-booking/'+this.ownerId)
              this.nav.navigateRoot('/user-booking')
              // this.router.navigate(['/user-booking', this.id])
              // this.nav.navigateRoot('/user-booking/'+this.userId)
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

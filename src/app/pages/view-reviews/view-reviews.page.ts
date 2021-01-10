import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.page.html',
  styleUrls: ['./view-reviews.page.scss'],
})
export class ViewReviewsPage implements OnInit {

  reviewForm: FormGroup;

  id: any;

  arrayReviews: Array<any> = [];
  reviewSize: any;
  restaurants: firebase.firestore.DocumentData;
  profile: firebase.firestore.DocumentData;
  firstName: any;
  lastName: any;
  userId: any;
  ownerId: any;
  resManagerId: any;

  constructor(
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private router: Router
            ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    // fetching single restaurant
    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurants = snapshot.data();
      this.resManagerId = snapshot.get('ownerId');
      console.log('owner: ', this.resManagerId)
      console.log('view restaurant: ', this.restaurants)
    });

    // Fetching reviews
    firebase.firestore().collection('restaurants').doc(this.id).collection('reviews').orderBy('createdAt','desc').onSnapshot(res => {
      res.forEach(doc => {
        this.arrayReviews.push(doc.data());
        this.reviewSize = (this.arrayReviews).length
        console.log('length: ', this.reviewSize)
        // this.firstName = doc.get('firstName');
        // this.lastName = doc.get('lastName');
      });
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

    this.addReview();
  }

  addReview(){
    this.reviewForm = this.fb.group({
      review: ['', Validators.required]
    });
  }

  async reviewSubmit(){

    const alert = await this.alertCtrl.create({

      message: `Thank you for submitting your review, please click Okay to see your booking details.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {

            var user = firebase.auth().currentUser;
            this.userId = user.uid;
            console.log('userId: ', this.userId);
            this.ownerId = this.id;
            console.log('Owner Id: ', this.ownerId)

            firebase.firestore().collection('restaurants').doc(this.id).collection('reviews').add({
                restId: this.id,
                userId: this.userId,
                resManagerId: this.resManagerId,
                firstName: this.firstName,
                lastName: this.lastName,
                review: this.reviewForm.value.review,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then((doc) => {
              doc.set({ reviewId: doc.id }, { merge: true }).then(() => {
                console.log('REVIEW ID ADDED ')
              })
              this.router.navigate(['/view-reviews', this.id])
              this.reviewForm.reset();
            }).catch(function (error) {
              console.log(error)
            })
          },
        },
      ],
    });
    return await alert.present();
  }

}

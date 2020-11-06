import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  constructor(
            private restaurantService: RestaurantsService, 
            private fb: FormBuilder,
            private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.restaurantService.signAuth();

    firebase.firestore().collection('restaurants').onSnapshot(res => {
      res.forEach(element => {
        this.restaurants.push(element.data());
      });
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurant = snapshot.data();
      console.log('new data: ', this.restaurant)
    });

    this.addReview();
  }

  addReview(){
    this.reviewForm = this.fb.group({
      review: ['', Validators.required]
    });
  }

  reviewSubmit(){
    const user = firebase.auth().currentUser.uid
    this.userId = user;

    this.ownerId = this.uid

    firebase.firestore().collection('restaurants').doc(this.uid).collection('reviews').add({
      ownerId: this.uid,
      userId: this.userId,
      review: this.reviewForm.value.review
    }).then(function(docRef){
      console.log("Document booking: ", docRef);
    }).catch(function(error){
      console.log(error);
    });
    //this.nav.navigateRoot('/user-booking')
    this.reviewForm.reset();
  }

}

import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore'

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.page.html',
  styleUrls: ['./user-booking.page.scss'],
})
export class UserBookingPage implements OnInit {

  uid = this.activatedActivated.snapshot.params.id;
  id: any;
  ownerId: any
  userId: any;

  booking: Array<any> = [];

  constructor(
              private activatedActivated: ActivatedRoute, 
              private router: Router, 
              private restaurantService: RestaurantsService
    ) { }

  ngOnInit() {
    this.restaurantService.signAuth();
    const user = firebase.auth().currentUser;
    this.userId = user.uid;
    console.log('user id Booked: ', this.userId)

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    console.log('view user booking ID', this.id)

    // view user bookings details
    // firebase.firestore().collection('restaurants').doc(this.id).collection('bookings').onSnapshot(res => {
    //   res.forEach(element => {
    //     this.booking.push(element.data());
    //   });
    // });
    firebase.firestore().collection('restaurants').doc(this.id).collection('bookings').onSnapshot(res => {
      res.forEach(element => {
        this.booking.push(element.data());
      });
    });

  }

  deleteBooking(){
    //delete collection and subcollections
    // firebase.firestore().collection('restaurants').where('ownerId', '==', this.id).get().then(function(snapshot){
    //   snapshot.forEach(function(doc){
    //     doc.ref.delete();
    //     console.log('delete: ', doc.data())
    //   });
    // });

     // delete subcollection 
    firebase.firestore().collection("restaurants").doc(this.id).collection('bookings').doc(this.userId).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  

  

}

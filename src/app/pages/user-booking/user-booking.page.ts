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
    let user = firebase.auth().currentUser;
    this.userId = user.uid;
    console.log('user id Booked: ', user)

    const userBookings = firebase.firestore().collectionGroup('bookings').where('userId', '==', this.userId).orderBy('date', 'desc');
    userBookings.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.booking.push(doc.data())
        console.info('doc-id: ', doc.id, '=>', 'doc-data: ', doc.data());
        console.log('userBookings: ', this.booking)
      })
    })

  }

  status(ownerId, userId, status){
    this.restaurantService.bookingStatus(ownerId, userId, status);
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

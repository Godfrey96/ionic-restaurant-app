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
    //const user = firebase.auth().currentUser;
    //this.userId = user.uid;

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    console.log('view user booking ID', this.uid)

    firebase.firestore().collection('restaurants').doc(this.id).collection('bookings').onSnapshot(res => {
      res.forEach(element => {
        this.booking.push(element.data());
        //this.router.navigateByUrl('/user-booking')
        // console.log(this.menu)
        // console.log(element.data().name)
        // console.log(element.id)
        //.collection('users').doc(this.userId)
      });
    });

    
    
  }

  deleteBooking(){
    firebase.firestore().collection("restaurants").doc(this.id).collection('bookings').doc(this.id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  

  

}

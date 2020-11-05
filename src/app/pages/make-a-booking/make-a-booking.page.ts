import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-make-a-booking',
  templateUrl: './make-a-booking.page.html',
  styleUrls: ['./make-a-booking.page.scss'],
})
export class MakeABookingPage implements OnInit {

  uid = this.activatedActivated.snapshot.params.id;
  id: any;
  ownerId: any
  array:any=[]

  bookingForm: FormGroup;

  spin:boolean = false;

  constructor(
              private activatedActivated: ActivatedRoute,
              private fb: FormBuilder,
              private restaurantService: RestaurantsService
    ) { }

  ngOnInit() {

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    console.log(this.uid)
    // this.id = this.activatedActivated.snapshot.paramMap.get('id')
    // console.log('ID: ', this.id)
    // console.log(this.uid)

    // firebase.firestore().collection('restaurants').where('ownerId', '==', this.uid).get().then(snapshot => {
    //   snapshot.docs.forEach(restaurant => {
    //      this.array.push( restaurant.data())
    //     console.log('res: ',this.array)
    //   })
    // })
    this.bookingData();
  }
  bookingData(){
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      guests: ['', Validators.required],
      preference: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  addBooking(){
    this.ownerId = this.uid
    console.log('owner Id: ', this.ownerId)
    this.restaurantService.booking().doc(this.uid).collection('bookings').add({
      ownerId: this.uid,
      date: this.bookingForm.value.date,
      time: this.bookingForm.value.time,
      guests: this.bookingForm.value.guests,
      preference: this.bookingForm.value.preference,
      firstName: this.bookingForm.value.firstName,
      lastName: this.bookingForm.value.lastName,
      mobile: this.bookingForm.value.mobile,
      email: this.bookingForm.value.email
    }).then(function(docRef){
      console.log("Document booking: ", docRef);
    }).catch(function(error){
      console.log(error);
    });
    this.bookingForm.reset();
  }


}

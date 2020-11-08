import { NavController } from '@ionic/angular';
import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

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
  userId: any;
  array: any = []

  resName: any;
  resResult: any;

  bookingForm: FormGroup;

  spin: boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private activatedActivated: ActivatedRoute,
    private fb: FormBuilder,
    private restaurantService: RestaurantsService,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.restaurantService.signAuth();

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    console.log(this.uid)

    this.bookingData();
  }
  bookingData() {
    this.bookingForm = this.fb.group({
      //resName: ['', Validators.required],
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

  async addBooking() {

    const alert = await this.alertCtrl.create({

      message: `Thank you for making a booking with us, please click Okay to confirm.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: ', blah);
          },
        },
        {
          text: 'Okay',
          handler: () => {

            var user = firebase.auth().currentUser;
            this.userId = user.uid;
            console.log('userId booking: ', this.userId);
            this.ownerId = this.uid;
            console.log('Owner ID booking: ', this.id)

            this.restaurantService.booking().doc(this.id).collection('bookings').doc(this.userId).set({
              userId: this.userId,
              ownerId: this.uid,
              date: this.bookingForm.value.date,
              time: this.bookingForm.value.time,
              guests: this.bookingForm.value.guests,
              preference: this.bookingForm.value.preference,
              firstName: this.bookingForm.value.firstName,
              lastName: this.bookingForm.value.lastName,
              mobile: this.bookingForm.value.mobile,
              email: this.bookingForm.value.email
            }).then(() => {
              this.nav.navigateRoot('/reviews/' + this.ownerId);
              this.bookingForm.reset();
            }).catch(function (error) {
              console.log(error)
            })
          },
        },
      ],
    });
    return await alert.present();

    // var user = firebase.auth().currentUser;
    // this.userId = user.uid;
    // console.log('userId: ', this.userId)

    // this.ownerId = this.uid

    // this.restaurantService.booking().doc(this.uid).collection('bookings').add({
    //   userId: this.userId,
    //   ownerId: this.uid,
    //   date: this.bookingForm.value.date,
    //   time: this.bookingForm.value.time,
    //   guests: this.bookingForm.value.guests,
    //   preference: this.bookingForm.value.preference,
    //   firstName: this.bookingForm.value.firstName,
    //   lastName: this.bookingForm.value.lastName,
    //   mobile: this.bookingForm.value.mobile,
    //   email: this.bookingForm.value.email
    // }).then(() => {
    //   loading.dismiss().then(() => {
    //     this.nav.navigateRoot('/reviews/' + this.ownerId);
    //   });
    // }, error => {
    //   loading.dismiss().then(() => {
    //     console.error(error);
    //   });
    // }
    // );
    // return await loading.present();



    // this.restaurantService.booking().doc(this.uid).collection('bookings').add({
    //   userId: this.userId,
    //   ownerId: this.uid,
    //   date: this.bookingForm.value.date,
    //   time: this.bookingForm.value.time,
    //   guests: this.bookingForm.value.guests,
    //   preference: this.bookingForm.value.preference,
    //   firstName: this.bookingForm.value.firstName,
    //   lastName: this.bookingForm.value.lastName,
    //   mobile: this.bookingForm.value.mobile,
    //   email: this.bookingForm.value.email
    // }).then(function(docRef){
    //   console.log("Document booking: ", docRef);
    // }).catch(function(error){
    //   console.log(error);
    // });
    // this.nav.navigateRoot('/reviews/'+this.ownerId)
    // this.bookingForm.reset();
  }


}

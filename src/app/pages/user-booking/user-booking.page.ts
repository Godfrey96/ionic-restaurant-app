import { UserModalComponent } from './../user-modal/user-modal.component';
import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import firebase from 'firebase/app';
import 'firebase/firestore'
import { ModalController, LoadingController, NavController, AlertController } from '@ionic/angular';

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
  user_Id: any;
  resName: any
  disableButton: boolean = false;

  spin: boolean = false;

  booking: Array<any> = [];
  restaurants: any

  constructor(
              private activatedActivated: ActivatedRoute, 
              private restaurantService: RestaurantsService,
              private modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public nav: NavController,
    ) { }

  ngOnInit() {

    this.restaurantService.signAuth();
    let user = firebase.auth().currentUser;
    this.userId = user.uid;
    console.log('user id Booked: ', user)

    const userBookings = firebase.firestore().collectionGroup('bookings').where('userId', '==', this.userId).orderBy('createdAt', 'desc');
    userBookings.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.booking.push(Object.assign( doc.data(), {uid:doc.id}) )
        this.user_Id = {uid:doc.id}
        console.log('user_idd: ', this.user_Id)
        // console.log('doc-id: ', {uid:doc.id}, '=>', 'doc-data: ', doc.data());
        // console.log('userBookings: ', this.booking)
      })
    })

  }

  async statuses(ownerId, userId, status){

    const alert = await this.alertCtrl.create({

      message: `Are you sure you want to cancel your booking?.`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm No: ', blah);
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.restaurantService.bookingStatus(ownerId, userId, status);
            this.disableButton = true;
          }
        }
      ]

    });
    return await alert.present();

  }

  async openModal(book){
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      componentProps: { 
        resName: book.resName, 
        guests: book.guests, 
        preference: book.preference, 
        date: book.date, 
        time: book.time,
        status: book.status
      }
    });
    await modal.present();
  }

  ago(time){
    let difference = moment(time).diff(moment())
    return moment.duration(difference).humanize();
  }

}

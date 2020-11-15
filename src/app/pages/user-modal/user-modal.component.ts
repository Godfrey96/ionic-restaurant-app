import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestaurantsService } from 'src/app/services/restaurants.service';

import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {

  @Input() resName: any
  @Input() guests: any
  @Input() preference: any
  @Input() date: any
  @Input() time: any
  @Input() status: any

  uid = this.activatedActivated.snapshot.params.id;
  userId: any
  user_Id: any
  ownerId: any
  booking: Array<any> = [];

  constructor(
              private activatedActivated: ActivatedRoute,
              private modalCtrl: ModalController,
              private restaurantService: RestaurantsService,
  ) { }

  ngOnInit() {

    console.log('UID: ', this.uid)

    this.restaurantService.signAuth();
    let user = firebase.auth().currentUser;
    this.userId = user.uid;
    console.log('user id Booked: ', user)

    const userBookings = firebase.firestore().collectionGroup('bookings').where('userId', '==', this.userId).orderBy('date', 'desc');
    userBookings.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.booking.push(Object.assign( doc.data(), {uid:doc.id}) )
        this.user_Id = {uid:doc.id}
        this.ownerId = doc.get('ownerId')
        // console.info('doc-id: ', {uid:doc.id}, '=>', 'doc-data: ', doc.data());
        // console.log('userBookings: ', this.booking)
      })
    })

  }

  statuses(ownerId, userId, value){
    firebase.firestore().collection('restaurants').doc(ownerId).collection('bookings').doc(userId).set({
      status: value
    }, { merge: true }).then((a) => {
      console.log("Changed: ", a)
    });
  }

  // statuses(ownerId, userId, status){
  //   console.log('Onwer Id: ', ownerId)
  //   console.log('User id: ', userId)
  //   this.restaurantService.bookingStatus(ownerId, userId, status);
  // }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

}

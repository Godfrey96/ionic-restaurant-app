import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.page.html',
  styleUrls: ['./view-restaurant.page.scss'],
})
export class ViewRestaurantPage implements OnInit {
uid = this.activatedActivated.snapshot.params.id;
  //id: any;
  resDetails: any = {};
  res: any = {};
  id: any;
  array:any=[]
  array1:any=[]
  constructor(
    public nav: NavController,
    private activatedActivated: ActivatedRoute,
    private restaurantService: RestaurantsService
    // public navParams: NavParams
  ) { }

  ngOnInit() {

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    console.log(this.uid)

    firebase.firestore().collection('restaurants').where('ownerId', '==', this.uid).get().then(snapshot => {
      snapshot.docs.forEach(restaurant => {
         this.array.push( restaurant.data())
        console.log('res: ',this.array)
      })
    })


    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    console.log(this.uid)

    firebase.firestore().collection('menu').where('ownerId', '==', this.uid).limit(3).get().then(snapshot => {
      snapshot.docs.forEach(menu => {
         this.array1.push( menu.data())
        console.log('menu: ',this.array1)
      })
    })



    // firebase.firestore().collection('restaurants').where('ownerId', '==', this.uid).get().then(snapshot => {
    //   snapshot.docs.forEach(restaurant => {
    //     this.res = restaurant
    //     console.log('res: ', this.res)
    //   })
    // })

    // firebase.firestore().collection('restaurants').doc().get().then(function (doc) {
    //   if (doc.exists) {
    //     console.log("Document data: ", doc.data());
    //   } else {
    //     console.log('No such document');
    //   }
    // }).catch(function (error) {
    //   console.log("error getting document: ", error)
    // });
  }


  // this.restaurantService.getRestaurantById(this.id).then(res => {
  //   this.res = res
  //   // console.log('details ', this.res)
  //   // console.log('res ', res)
  // });


  // this.id = this.activatedActivated.snapshot.paramMap.get('doc.id');
  // console.log(this.id)

  //   firebase.firestore().collection('restaurants').doc().get().then(function (doc) {
  //     if (doc.exists) {
  //       console.log("Document data: ", doc.data());
  //       this.resDetails = doc.data();
  //     } else {
  //       console.log("No such documents");
  //     }
  //   }).catch(function (error) {
  //     console.log("Error getting document: ", error);
  //   });
  // }



  // firebase.firestore().collection('restaurants').doc('5CKTrfBVVv8c3Jf8GfB2');
  //console.log(this.resDetails)

  // firebase.firestore().collection('restaurants').onSnapshot(res => {
  //   res.forEach(element => {
  //     this.resDetails.push(element.data());
  //     console.log(this.resDetails)
  //     // console.log(element.id)
  //   });
  // });


  // firebase.firestore().collection('restaurants').doc().get().then(function (doc) {
  //   if (doc.exists) {
  //     console.log("Document data: ", doc.data());
  //   } else {
  //     console.log("No such documents");
  //   }
  // }).catch(function (error) {
  //   console.log("Error getting document: ", error);
  // });

  // firebase.firestore().collection('restaurants').doc().get().then(function (doc) {
  //   if (doc.exists) {
  //     console.log('document data: ', doc.data());
  //     console.log('document id: ', doc.id);
  //   } else {
  //     console.log('No such document');
  //   }
  // }).catch(function (error) {
  //   console.log("error getting document: ", error)
  // });

  // firebase.firestore().collection('restaurants').doc().get().then(function (doc) {
  //   if (doc.exists) {
  //     console.log('document data: ', doc.data());
  //     console.log('document id: ', doc.id);
  //   } else {
  //     console.log('No such document');
  //   }
  // }).catch(function (error) {
  //   console.log("error getting document: ", error)
  // });



}

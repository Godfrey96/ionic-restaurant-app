import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  completeForm: FormGroup;
  userId: any;

  spin: boolean = false;

  constructor(
              public nav: NavController,
              private fb: FormBuilder,
              private restaurantService: RestaurantsService
              ) { }

  ngOnInit() {
    this.restaurantService.signAuth();
    this.completeSetup();
  }
  completeSetup(){
    this.completeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    });
  }

  completeSignup(){
    const user = firebase.auth().currentUser

    this.userId = user.uid

    this.restaurantService.registerUser().doc(this.userId).set({
      userId: this.userId,
      firstName: this.completeForm.value.firstName,
      lastName: this.completeForm.value.lastName,
      email: this.completeForm.value.email,
      mobile: this.completeForm.value.mobile
    }).then(function(docRef){
      console.log("Document written data: ", docRef);
    }).catch(function(error){
      console.log(error);
    });
    this.nav.navigateRoot('/landing-page');
    this.completeForm.reset();

    const displayName = (<HTMLInputElement>document.getElementById("displayName")).value;

    this.spin = true;

    // const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: displayName,
    }).then(() => {
      localStorage.setItem("Display Name: ", displayName);
      this.nav.navigateRoot('/landing-page')
    })
  }

  // completeSignup(){
    // const firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
    // const lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
    // const email = (<HTMLInputElement>document.getElementById("email")).value;
    // const mobile = (<HTMLInputElement>document.getElementById("mobile")).value;
  //   this.spin = true;

  //   const user = firebase.auth().currentUser;
  //   user.updateProfile({
  //     displayName: firstName,
  //   }).then(() => {
  //     localStorage.setItem("firstName", firstName);
  //     this.nav.navigateRoot('/landing-page')
  //   })
  // }

}

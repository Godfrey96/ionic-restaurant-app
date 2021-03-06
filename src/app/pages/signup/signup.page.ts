import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  completeForm: FormGroup;
  userId: any;
  phoneNumber: string;

  isSubmitted: boolean = false;

  spin: boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    private restaurantService: RestaurantsService
  ) {
    this.phoneNumber = localStorage.getItem("phoneNumber");
  }

  ngOnInit() {
    this.restaurantService.signAuth();
    this.completeSetup();
  }
  completeSetup() {
    this.completeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      DoB: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]]
    });
  }

  get errorCtr() {
    return this.completeForm.controls
  }


  async completeSignup() {

    this.isSubmitted = true;

    if (this.completeForm.valid) {

      const loading = await this.loadingCtrl.create();

      const user = firebase.auth().currentUser
      this.userId = user.uid

      firebase.firestore().collection('users').doc(this.userId).set({
        userId: this.userId,
        phoneNumber: this.phoneNumber,
        firstName: this.completeForm.value.firstName,
        lastName: this.completeForm.value.lastName,
        DoB: this.completeForm.value.DoB,
        email: this.completeForm.value.email
      }).then(() => {
        loading.dismiss().then(() => {
          this.nav.navigateRoot('/tabs/landing-page');
          this.completeForm.reset();
        })
      },
        error => {
          loading.dismiss().then(() => {
            console.log(error);
          })
        }
      );
      return await loading.present();

    } else {
      console.log('All fields are required')
      const toast = await this.toastCtrl.create({
        message: "All fields are required",
        duration: 3000
        // position: 'top-or-middle'
      });
      toast.present();
    }
  }

}

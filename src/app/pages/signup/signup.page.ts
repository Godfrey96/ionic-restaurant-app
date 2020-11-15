import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

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
              public loadingCtrl: LoadingController,
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
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get name() {
    return this.completeForm.get("name");
  }

  get lastName() {
    return this.completeForm.get("lastName");
  }

  get email() {
    return this.completeForm.get("email");
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'first name is required' },
      { type: 'maxLength', message: 'first name cannot be longer than 100 characters' }
    ],
    lastName: [
      { type: 'required', message: 'Last name is required' },
      { type: 'maxLength', message: 'Last name cannot be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please provide valid email.' }
    ]
  }



  async completeSignup(){

    const loading = await this.loadingCtrl.create();

    const user = firebase.auth().currentUser
    this.userId = user.uid

    this.restaurantService.registerUser().doc(this.userId).set({
      userId: this.userId,
      name: this.completeForm.value.name,
      lastName: this.completeForm.value.lastName,
      email: this.completeForm.value.email,
      //mobile: this.completeForm.value.mobile
    }).then(() => {
      loading.dismiss().then(() => {
        this.nav.navigateRoot('/landing-page');
        this.completeForm.reset();
      })
    },
    error => {
      loading.dismiss().then(() => {
        console.log(error);
      });
    }
    );
    
    var name = (<HTMLInputElement>document.getElementById("name")).value;

    this.spin = true;

    // const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(() => {
      localStorage.setItem("Display Name: ", name);
      console.log('disp: ', name)
      this.nav.navigateRoot('/landing-page')
    })


    return await loading.present();
  }
  

}

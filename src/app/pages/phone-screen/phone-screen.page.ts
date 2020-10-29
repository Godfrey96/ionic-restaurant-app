import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

import firebase from 'firebase/app';

//require('firebase/firestore');
require('firebase/auth');

@Component({
  selector: 'app-phone-screen',
  templateUrl: './phone-screen.page.html',
  styleUrls: ['./phone-screen.page.scss'],
})
export class PhoneScreenPage implements OnInit {

  code: string = "+27"; //default country
  spin: boolean = false; //spinner
  otpSent: boolean = false; //OTP sent status
  phoneNumber: string; //set value after OTP is sent

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;


  constructor(
    public nav: NavController,
    public popoverController: PopoverController
  ) {
    //keep track of currently selected country code
    setInterval(() => {
      if (sessionStorage.getItem("code")) {
        this.code = sessionStorage.getItem("code")
      }
    }, 100);
  }

  // ionViewDidLoad() {
  //   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  //     'size': 'invisiable'
  //   });
  // }
  

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible'
    });
  }


  sendOTP() {

    const phNo = this.code + (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    const appVerifier = this.recaptchaVerifier
    console.log('the phone nUmber is' + phNo)
    this.spin = true;

    firebase.auth().signInWithPhoneNumber(phNo, appVerifier).then(result => {
      this.phoneNumber = phNo;
      this.otpSent = true;
      this.confirmationResult = result;
      this.spin = false;
    }).catch(err => {
      this.spin = false;
      alert(err);
    })
  }

  verifyOTP() {
    const otp = (<HTMLInputElement>document.getElementById("otp")).value;
    this.spin = true;

    this.confirmationResult.confirm(otp).then((data) => {
      this.spin = false;
      //Save user uid to localStorage
      localStorage.setItem("uid", data.user.uid);
      //Save phoneNumber to localStorage
      localStorage.setItem("phoneNumber", data.user.phoneNumber);

      //If user has name
      //Navigate to home page
      if (data.user.displayName) {
        this.nav.navigateRoot("/landing-page");
      }
      //navigate to profile setup page
      else {
        this.nav.navigateRoot("/signup");
      }
    }).catch(err => {
      alert(err);
      this.spin = false;
    })
  }

}

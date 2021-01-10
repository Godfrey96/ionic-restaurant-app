import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/auth'

//require('firebase/firestore');
// require('firebase/auth');

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

  checkUser: any;
  mobile: any;

  userP: any;
  firstName: any;

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;


  constructor(
    public nav: NavController,
    public popoverController: PopoverController
  ) { }

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

      let user = firebase.auth().currentUser.uid
      console.log('User', user);

      firebase.firestore().collection('users').doc(user).get().then((snapshot) => {
        this.userP = snapshot.data();
        console.log('user profile: ', this.userP);
        this.firstName = snapshot.get('firstName');
        console.log('hahah FIRST NAME: ', this.firstName);
        this.mobile = snapshot.get('phoneNumber');
        console.log('mobile: ', this.mobile);

        // Checking if the first name is available before logging in
        if (this.firstName) {
          console.log(' IF FIRST NAME: ', this.firstName);
          this.nav.navigateRoot("/tabs/landing-page");
        } else {
          console.log('Else User FIRST NAME: ', this.firstName);
          this.nav.navigateRoot("/signup");
        }
      })

      this.spin = false;
      //Save user uid to localStorage
      localStorage.setItem("uid", data.user.uid);
      //Save phoneNumber to localStorage
      localStorage.setItem("phoneNumber", data.user.phoneNumber);

    }).catch(err => {
      alert(err);
      this.spin = false;
    })
  }
}



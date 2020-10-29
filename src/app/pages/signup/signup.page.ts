import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  spin: boolean = false;

  constructor(
              public nav: NavController
              ) { }

  ngOnInit() {
  }

  completeSignup(){
    const firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
    // const lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
    // const email = (<HTMLInputElement>document.getElementById("email")).value;
    this.spin = true;

    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: firstName,
    }).then(() => {
      localStorage.setItem("firstName", firstName);
      this.nav.navigateRoot('/landing-page')
    })
  }

}

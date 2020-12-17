import { Component, OnInit } from '@angular/core';
import firebase  from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: any;

  constructor() {  }

  ngOnInit() {

    let user = firebase.auth().currentUser.uid
    console.log('User: ', user)

    firebase.firestore().collection('users').doc(user).get().then(snapshot => {
      this.profile = snapshot.data();
      console.log('new data: ', this.profile)
    })
  }

}

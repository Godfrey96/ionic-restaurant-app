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

  name: string;
  phoneNumber: string;
  dp: string; 
  profile: any;

  constructor() { 
    this.name = localStorage.getItem("name");
    this.phoneNumber = localStorage.getItem("phoneNumber");
    this.dp = "https://ui-avatars.com/api/?background=ff7f50" + "&color=ffffff&size=128&bold=true&name=" + this.name;
  }

  ngOnInit() {

    let user = firebase.auth().currentUser.uid
    console.log('User: ', user)

    firebase.firestore().collection('users').doc(user).get().then(snapshot => {
      this.profile = snapshot.data();
      console.log('new data: ', this.profile)
      // if(user === 'ownerId'){
      //   this.show = this.restaurants
      // }
    })


  }

}

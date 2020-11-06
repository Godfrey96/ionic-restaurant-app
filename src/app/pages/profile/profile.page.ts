import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  displayName: string;
  phoneNumber: string;
  dp: string;

  constructor() { 
    this.displayName = localStorage.getItem("displayName");
    this.phoneNumber = localStorage.getItem("phoneNumber");
    this.dp = "https://ui-avatars.com/api/?background=ff7f50" + "&color=ffffff&size=128&bold=true&name=" + this.displayName;
  }

  ngOnInit() {
  }

}

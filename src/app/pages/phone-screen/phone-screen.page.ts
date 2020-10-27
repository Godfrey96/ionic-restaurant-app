import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-screen',
  templateUrl: './phone-screen.page.html',
  styleUrls: ['./phone-screen.page.scss'],
})
export class PhoneScreenPage implements OnInit {

  code: string = "+27"; //default country

  constructor() { }

  ngOnInit() {
  }

}

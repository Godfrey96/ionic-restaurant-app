import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    autoplay: true,
    speed: 1000
  };


  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
       this.router.navigate(["/slides"]);
    }, 3000);
   }

  // slides(){
  //   this.router.navigateByUrl('/slides');
  // }

}

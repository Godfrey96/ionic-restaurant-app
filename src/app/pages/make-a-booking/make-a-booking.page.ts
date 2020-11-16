import { NavController } from '@ionic/angular';
import { RestaurantsService } from './../../services/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-make-a-booking',
  templateUrl: './make-a-booking.page.html',
  styleUrls: ['./make-a-booking.page.scss'],
})
export class MakeABookingPage implements OnInit {

  public minDate = moment().format();
  public maxDate = moment().add(5, 'y').format('YYYY');
  myDate = moment().toDate(); 

  minTime = '06:30';
  maxTime = '19:30';
  hourValues = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19'];

  uid = this.activatedActivated.snapshot.params.id;
  id: any;
  ownerId: any
  userId: any;
  array: any = []

  resName: any;
  resResult: any;

  isSubmitted: boolean = false;

  bookingForm: FormGroup;

  spin: boolean = false;

  restaurants: any = [];

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private activatedActivated: ActivatedRoute,
    private fb: FormBuilder,
    private restaurantService: RestaurantsService,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.restaurantService.signAuth();

    this.id = this.activatedActivated.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)
    //console.log(this.uid)

    // fetching single restaurant
    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurants = snapshot.data();
      this.resName = snapshot.get('resName');
      console.log('Booking-resName: ', this.resName)
      console.log('new data: ', this.restaurants)
    });

    this.bookingData();
  }

  changeDate(event: FocusEvent){
    const eventTarget = event.target;
    console.log(eventTarget);
  }

  bookingData() {
    this.bookingForm = this.fb.group({
      //resName: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      guests: ['', Validators.required],
      preference: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]]
    });
  }

  get firstName() {
    return this.bookingForm.get("firstName");
  }

  get lastName() {
    return this.bookingForm.get("lastName");
  }

  get email() {
    return this.bookingForm.get("email");
  }

  get mobile() {
    return this.bookingForm.get("mobile");
  }

  public errorMessages = {
    firstName: [
      { type: 'required', message: 'First name is required' },
      { type: 'maxlength', message: 'First name cannot be longer than 100 characters' }
    ],
    lastName: [
      { type: 'required', message: 'Last name is required' },
      { type: 'maxlength', message: 'Last name cannot be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please provide valid email.' }
    ],
    mobile: [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile number cannot be less than 10 digits.' },
      { type: 'maxlength', message: 'Mobile number cannot be more than 10 digits.' },
      { type: 'pattern', message: 'Only numerical values allowed.' }
    ]
  }


  async addBooking() {

    const alert = await this.alertCtrl.create({

      message: `Thank you for making a booking with us, please click Okay to confirm.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: ', blah);
          },
        },
        {
          text: 'Okay',
          handler: () => {

            var user = firebase.auth().currentUser;
            this.userId = user.uid;
            console.log('userId booking: ', this.userId);
            this.ownerId = this.uid;
            console.log('Owner ID booking: ', this.id)

            this.isSubmitted = true;
            // if(this.bookingForm.valid){
              this.restaurantService.booking().doc(this.id).collection('bookings').add({
                userId: this.userId,
                ownerId: this.uid,
                resName: this.resName,
                date: this.bookingForm.value.date,
                time: this.bookingForm.value.time,
                guests: this.bookingForm.value.guests,
                preference: this.bookingForm.value.preference,
                firstName: this.bookingForm.value.firstName,
                lastName: this.bookingForm.value.lastName,
                mobile: this.bookingForm.value.mobile,
                email: this.bookingForm.value.email,
                createdAt: new Date(),
                status: 'Pending'
              }).then(() => {
                this.nav.navigateRoot('/reviews/' + this.ownerId);
                this.bookingForm.reset();
              }).catch(function (error) {
                console.log(error)
              })
            // }else{
            //   console.log('Invalid fields')
            // }
          },
        },
      ],
    });
    return await alert.present();
  }


}

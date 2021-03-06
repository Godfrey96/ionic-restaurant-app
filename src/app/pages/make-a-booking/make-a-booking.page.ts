import { NavController, ToastController } from '@ionic/angular';
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
  restId: any;
  array: any = []

  resName: any;
  resResult: any;

  isSubmitted: boolean = false;

  bookingForm: FormGroup;

  spin: boolean = false;

  usersLoggedIn: Array<any> = [];
  userDetails: any

  restaurants: any = [];
  bookId: any;
  resManagerId: any;
  userKey: any;
  firstName: any;
  lastName: any;
  email: any;
  mobile: any;
  phoneNumber: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private activatedActivated: ActivatedRoute,
    private fb: FormBuilder,
    private restaurantService: RestaurantsService,
    private nav: NavController,
    public toastCtrl: ToastController
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
      this.resManagerId = snapshot.get('ownerId');
      console.log('Booking-resName: ', this.resName)
      console.log('Res Manager ID: ', this.resManagerId)
      console.log('new data: ', this.restaurants)
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get().then(res => {
          this.userDetails = res.data()
          console.log('USER DETAILS: ', this.userDetails)
          this.firstName = res.get('firstName')
          this.lastName = res.get('lastName')
          this.email = res.get('email')
          this.phoneNumber = res.get('phoneNumber')
          console.log(this.firstName, " ", this.lastName, " ", this.email, " ", this.phoneNumber)
        })
      }
    })

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
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // mobile: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.0]+.[a-zA-Z]{2,4}$')]]
    });
  }

  get errorCtr(){
    return this.bookingForm.controls
  }


  async addBooking() {

    this.isSubmitted = true;

    if(this.bookingForm.valid){

      firebase.auth().onAuthStateChanged((user) => {
        if(user){

          var userIn = firebase.auth().currentUser.uid;

          firebase.firestore().collection('users').where('userId', '==', userIn).onSnapshot(res => {
            res.forEach(async doc => {
              this.usersLoggedIn.push(Object.assign(doc.data(), { uid: doc.id }))
              this.userKey = doc.data().userId
              console.log('user key: ', this.userKey)

              if(this.userKey == userIn){
                console.log('userKey ', this.userKey, '<==>', userIn, ' userId')

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
            
                        // var user = firebase.auth().currentUser;
                        // this.userId = user.uid;
                        // console.log('userId booking: ', this.userId);
                        this.ownerId = this.uid;
                        console.log('Owner ID booking: ', this.id)
            
                        this.isSubmitted = true;
                        // if(this.bookingForm.valid){
                          this.restaurantService.booking().doc(this.id).collection('bookings').add({
                            userId: userIn,
                            restId: this.id,
                            resName: this.resName,
                            resManagerId: this.resManagerId,
                            date: this.bookingForm.value.date,
                            time: this.bookingForm.value.time,
                            guests: this.bookingForm.value.guests,
                            preference: this.bookingForm.value.preference,
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            mobile: this.phoneNumber,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            status: 'Pending'
                          }).then((doc) => {
                            doc.set({ bookId: doc.id }, { merge: true }).then(() => {
                              console.log('BOOKING ID: ', this.bookId)
                            })
                            // this.nav.navigateRoot('/reviews/' + this.id);
                            this.nav.navigateRoot('/user-booking')
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

            })
          })

        }else{
          console.log('not logged in')
        }
      })

    }else{
      console.log('All fields are required')
      const toast = await this.toastCtrl.create({
        message: "All fields are required",
        duration: 3000
      });
      toast.present();
    }

    
  }


}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserBookingPage } from './user-booking.page';

describe('UserBookingPage', () => {
  let component: UserBookingPage;
  let fixture: ComponentFixture<UserBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

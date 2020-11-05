import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MakeABookingPage } from './make-a-booking.page';

describe('MakeABookingPage', () => {
  let component: MakeABookingPage;
  let fixture: ComponentFixture<MakeABookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeABookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MakeABookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

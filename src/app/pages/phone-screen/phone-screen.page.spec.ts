import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhoneScreenPage } from './phone-screen.page';

describe('PhoneScreenPage', () => {
  let component: PhoneScreenPage;
  let fixture: ComponentFixture<PhoneScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelListForDeliveryComponent } from './travel-list-for-delivery.component';

describe('TravelListForDeliveryComponent', () => {
  let component: TravelListForDeliveryComponent;
  let fixture: ComponentFixture<TravelListForDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelListForDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelListForDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistDeliveryComponent } from './exist-delivery.component';

describe('ExistDeliveryComponent', () => {
  let component: ExistDeliveryComponent;
  let fixture: ComponentFixture<ExistDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

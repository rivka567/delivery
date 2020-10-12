import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageListForDeliveryComponent } from './package-list-for-delivery.component';

describe('PackageListForDeliveryComponent', () => {
  let component: PackageListForDeliveryComponent;
  let fixture: ComponentFixture<PackageListForDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageListForDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageListForDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

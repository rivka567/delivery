import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPackagesComponent } from './personal-packages.component';

describe('PersonalPackagesComponent', () => {
  let component: PersonalPackagesComponent;
  let fixture: ComponentFixture<PersonalPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

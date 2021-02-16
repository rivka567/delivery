import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDrivesComponent } from './personal-drives.component';

describe('PersonalDrivesComponent', () => {
  let component: PersonalDrivesComponent;
  let fixture: ComponentFixture<PersonalDrivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDrivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

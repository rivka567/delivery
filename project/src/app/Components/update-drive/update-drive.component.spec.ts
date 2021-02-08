import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDriveComponent } from './update-drive.component';

describe('UpdateDriveComponent', () => {
  let component: UpdateDriveComponent;
  let fixture: ComponentFixture<UpdateDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessageAboutDriveComponent } from './show-message-about-drive.component';

describe('ShowMessageAboutDriveComponent', () => {
  let component: ShowMessageAboutDriveComponent;
  let fixture: ComponentFixture<ShowMessageAboutDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMessageAboutDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMessageAboutDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

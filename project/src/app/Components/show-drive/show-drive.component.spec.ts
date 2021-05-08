import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDriveComponent } from './show-drive.component';

describe('ShowDriveComponent', () => {
  let component: ShowDriveComponent;
  let fixture: ComponentFixture<ShowDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessageAboutPackageComponent } from './show-message-about-package.component';

describe('ShowMessageAboutPackageComponent', () => {
  let component: ShowMessageAboutPackageComponent;
  let fixture: ComponentFixture<ShowMessageAboutPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMessageAboutPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMessageAboutPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

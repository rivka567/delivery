import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllHappinessComponent } from './show-all-happiness.component';

describe('ShowAllHappinessComponent', () => {
  let component: ShowAllHappinessComponent;
  let fixture: ComponentFixture<ShowAllHappinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllHappinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllHappinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderBarComponent } from './under-bar.component';

describe('UnderBarComponent', () => {
  let component: UnderBarComponent;
  let fixture: ComponentFixture<UnderBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

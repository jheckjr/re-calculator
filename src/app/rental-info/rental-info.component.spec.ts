import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalInfoComponent } from './rental-info.component';

describe('RentalInfoComponent', () => {
  let component: RentalInfoComponent;
  let fixture: ComponentFixture<RentalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

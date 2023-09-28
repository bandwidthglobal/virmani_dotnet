import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentChairComponent } from './appointment-chair.component';

describe('AppointmentChairComponent', () => {
  let component: AppointmentChairComponent;
  let fixture: ComponentFixture<AppointmentChairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentChairComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

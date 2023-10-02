import { TestBed } from '@angular/core/testing';

import { AppointmentChairService } from './appointment-chair/appointment-chair.service';

describe('AppointmentChairService', () => {
  let service: AppointmentChairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentChairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

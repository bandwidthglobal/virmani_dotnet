import { Component, OnInit } from '@angular/core';
import { AppointmentChairService } from './appointment-chair.service'; // Make sure to import your service
import { CoreConfigService } from '@core/services/config.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-appointment-chair',
  templateUrl: './appointment-chair.component.html',
  styleUrls: ['./appointment-chair.component.scss']
})

export class AppointmentChairComponent implements OnInit {
  appointments: any[] = []; // Declare the 'appointments' property
  private _unsubscribeAll: Subject<any>;
  /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     */
  constructor(private _coreConfigService: CoreConfigService, private appointmentChairService: AppointmentChairService) {}

  ngOnInit(): void {
    // Load appointments when the component initializes
    this.getAppointments();
  }

  getAppointments(): void {
    // Replace this with your logic to fetch and return appointments from your API or mock data.
    /* return [
      { slotTime: '09:00 AM', green: 'Allot', pink: 'Allot', orange: 'Allot', surgical: 'Allot' },
      { slotTime: '09:15 AM', green: 'Allot', pink: 'Allot', orange: 'Allot', surgical: 'Allot' },
      { slotTime: '09:30 AM', green: 'Allot', pink: 'Allot', orange: 'Allot', surgical: 'Allot' },
      { slotTime: '09:45 AM', green: 'Allot', pink: 'Allot', orange: 'Allot', surgical: 'Allot' },
    ]; */

        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
                this.appointmentChairService.onAppointmentViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                    setTimeout(() => {
                        console.log(response)
                    }, 1000)
                    /* this.data = response;
                    this.rows = this.data;
                    this.tempData = this.rows;
                    this.tempFilterData = this.rows;
                    debugger; */
                });
            
        });
    
  }

  selectedDate: string = '2023-09-28'; // Initial date
  selectedDoctors: number[] = []; // Initial array for selected doctors (if any)
  selectedChairs: number[] = []; // Initial array for selected chairs (if any)
  doctors: { id: number, name: string }[] = [
    // Replace with your doctor data
    { id: 1, name: 'Doctor 1' },
    { id: 2, name: 'Doctor 2' },
    // Add more doctors here
  ];
  chairs: { id: number, name: string }[] = [
    // Replace with your chair data
    { id: 1, name: 'Green' },
    { id: 2, name: 'Pink' },
    // Add more chairs here
  ];

  applyFilters() {
    // Implement your filter logic here
    // This method will be called when the "Filter" button is clicked
    // You can access selectedDate, selectedDoctors, and selectedChairs here
  }

  printPage() {
    // Implement your print logic here
    // This method will be called when the "Print" button is clicked
  }

}

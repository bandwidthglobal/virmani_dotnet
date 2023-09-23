import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

// routing
const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-details/dashboarddata.module').then(m => m.DashboardDataModule)
    },
    {
        path: 'doctor',
        loadChildren: () => import('./doctor/doctordata.module').then(m => m.DoctorDataModule)
    },
    {
        path: 'drug',
        loadChildren: () => import('./drug/drugdata.module').then(m => m.DrugDataModule)
    },
    {
        path: 'patient',
        loadChildren: () => import('./patient/patientdata.module').then(m => m.PatientDataModule)
    },
    {
        path: 'staff',
        loadChildren: () => import('./staff/staffdata.module').then(m => m.StaffDataModule)
    },
    {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointmentdata.module').then(m => m.AppointmentDataModule)
    },
    {
        path: 'prescription',
        loadChildren: () => import('./prescription/prescriptiondata.module').then(m => m.PrescriptionDataModule)
    },
     {
         path: 'dealer',
         loadChildren: () => import('./dealer/dealerdata.module').then(m => m.DealerDataModule)
    }
];

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AdminModule {}

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
    path: 'email',
    loadChildren: () => import('./email/email.module').then(m => m.EmailModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
  },
  {
    path: 'e-commerce',
    loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    //{
    //    path: 'staff',
    //    loadChildren: () => import('./staff/staffdata.module').then(m => m.SatffDataModule)
    //},
    //{
    //    path: 'doctor',
    //    loadChildren: () => import('./doctor/doctordata.module').then(m => m.DoctorDataModule)
    //},
    //{
    //    path: 'patient',
    //    loadChildren: () => import('./patient/patientdata.module').then(m => m.PatientDataModule)
    //},
    //{
    //    path: 'prescription',
    //    loadChildren: () => import('./prescription/prescriptiondata.module').then(m => m.PrescriptionDataModule)
    //},
    //{
    //    path: 'dealer',
    //    loadChildren: () => import('./dealer/dealerdata.module').then(m => m.DealerDataModule)
    //},
    //{
    //    path: 'appointment',
    //    loadChildren: () => import('./appointment/appointmentdata.module').then(m => m.AppointmentDataModule)
    //},
    //{
    //    path: 'drug',
    //    loadChildren: () => import('./drug/drugdata.module').then(m => m.DrugDataModule)
    //}
];

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AppsModule {}

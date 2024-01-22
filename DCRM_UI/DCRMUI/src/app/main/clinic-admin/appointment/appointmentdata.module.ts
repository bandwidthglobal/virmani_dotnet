import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { SharedCommonModule } from 'app/shared-common/shared-ui.module';
import { MaskModule } from 'app/shared-common/directives/mask/mask.module';
import { AppointmentChairViewComponent } from './chair-view/chair-view.component';
import { AppointmentChairViewService } from './chair-view/chair-view.service';
import { SetSscheduleFormComponent } from './set-schedule/set-schedule-form.component';
import { SetSscheduleFormService } from './set-schedule/set-schedule-form.service';
import { CalenderViewComponent } from './calendar-view/calendar-view.component';
import { CalenderViewService } from './calendar-view/calendar-view.service';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { WaitingRoomService } from './waiting-room/waiting-room.service';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from './calendar/calendar.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppointmentListComponent } from 'app/main/clinic-admin/appointment/appointment-list/appointment-list.component';
import { AppointmentListService } from 'app/main/clinic-admin/appointment/appointment-list/appointment-list.service';

import { AppointmentAddComponent } from 'app/main/clinic-admin/appointment/appointment-add/appointment-add.component';
import { AppointmentAddService } from 'app/main/clinic-admin/appointment/appointment-add/appointment-add.service';

import { AppointmentEditComponent } from 'app/main/clinic-admin/appointment/appointment-edit/appointment-edit.component';
import { AppointmentEditService } from 'app/main/clinic-admin/appointment/appointment-edit/appointment-edit.service';
import { MatTableModule } from '@angular/material/table';
import { AppointmentPreviewComponent } from 'app/main/clinic-admin/appointment/appointment-preview/appointment-preview.component';
import { AppointmentPreviewService } from 'app/main/clinic-admin/appointment/appointment-preview/appointment-preview.service';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentChairFormComponent } from 'app/main/clinic-admin/appointment/chair-view/appointment-form/appointment-chair-form.component';
import { AppointmentDownloadComponent } from 'app/main/clinic-admin/appointment/appointment-download/appointment-download.component';
import { AppointmentDownloadService } from 'app/main/clinic-admin/appointment/appointment-download/appointment-download.service';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
const routes: Routes = [
    {
        path: 'add',
        component: AppointmentAddComponent,
        resolve: {
            Sas: AppointmentAddService
        },
        data: { animation: 'AppointmentAddComponent' }
    },
    {
        path: 'add/:id',
        component: AppointmentAddComponent,
        resolve: {
            Sas: AppointmentAddService
        },
    },
    {
        path: 'add/chairapointment',
        component: AppointmentAddComponent,
        resolve: {
            Sas: AppointmentAddService
        },
        data: { animation: 'AppointmentAddComponent' }
    },
    {
        path: 'list',
        component: AppointmentListComponent,
        resolve: {
            uls: AppointmentListService
        },
        data: { animation: 'AppointmentListComponent' }
    },
    {
        path: 'preview/:id',
        component: AppointmentPreviewComponent,
        resolve: {
            Sds: AppointmentPreviewService
        },
        data: { path: 'user-view/:id', animation: 'AppointmentPreviewComponent' }
    },
    {
        path: 'edit/:id',
        component: AppointmentEditComponent,
        resolve: {
            Ses: AppointmentEditService
        },
        data: { path: 'user-view/:id', animation: 'AppointmentEditComponent' }
    },
    {
        path: 'view/:id',
        component: AppointmentViewComponent,
        resolve: {
            Ses: AppointmentEditService
        },
        data: { path: 'user-view/:id', animation: 'AppointmentViewComponent' }
    },
    {
        path: 'edit/chairapointment/:id',
        component: AppointmentEditComponent,
        resolve: {
            Ses: AppointmentEditService
        },
    }
    ,
    {
        path: 'preview',
        redirectTo: '/drug/preview/4989' // Redirection
    },
    {
        path: 'edit',
        redirectTo: '/drug/edit/4989' // Redirection
    },
    {
        path: 'chairview',
        component: AppointmentChairViewComponent,
        resolve: {
            Sds: AppointmentChairViewService
        },

    },
    {
        path: 'assign',
        component: SetSscheduleFormComponent,
        resolve: {
            Sds: SetSscheduleFormService
        },

    },
    {
        path: 'calendarview',
        component: CalendarComponent,
        resolve: {
            Sds: CalendarService
        },

    },
    {
        path: 'waitingroom',
        component: WaitingRoomComponent,
        resolve: {
            Sds: WaitingRoomService
        },
        data: { animation: 'WaitingRoomComponent' }

    },
    {
        path: 'download/:id',
        component: AppointmentDownloadComponent,
        resolve: {
            Ses: AppointmentDownloadService
        },
    },
];

@NgModule({
    declarations: [
        AppointmentAddComponent,
        AppointmentListComponent,
        AppointmentPreviewComponent,
        AppointmentEditComponent,
        AppointmentFormComponent,
        AppointmentChairViewComponent,
        SetSscheduleFormComponent,
        CalenderViewComponent,
        WaitingRoomComponent,
        CalendarComponent,
        AppointmentChairFormComponent,
        AppointmentViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        CoreDirectivesModule,
        Ng2FlatpickrModule,
        NgxDatatableModule,
        FormsModule,
        CorePipesModule,
        NgbModule,
        NgSelectModule,
        CoreSidebarModule,
        FullCalendarModule,
        SharedCommonModule,
        MaskModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        CoreCommonModule,
        Ng2FlatpickrModule,
        NgxDatatableModule,
        FormsModule,
        CorePipesModule,
        NgbModule,
        NgSelectModule,
        CoreSidebarModule,

        SharedCommonModule,
        MaskModule,

    ],
    providers: [AppointmentListService, AppointmentPreviewService, AppointmentEditService, AppointmentAddService, AppointmentDownloadService,
        AppointmentChairViewService, SetSscheduleFormService, CalenderViewService, WaitingRoomService, CalendarService,AppointmentViewComponent
    ],
    exports: [AppointmentListComponent]
})
export class AppointmentDataModule { }

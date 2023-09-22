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

import { AppointmentListComponent } from 'app/main/apps/appointment/appointment-list/appointment-list.component';
import { AppointmentListService } from 'app/main/apps/appointment/appointment-list/appointment-list.service';

import { AppointmentAddComponent } from 'app/main/apps/appointment/appointment-add/appointment-add.component';
import { AppointmentAddService } from 'app/main/apps/appointment/appointment-add/appointment-add.service';

import { AppointmentEditComponent } from 'app/main/apps/appointment/appointment-edit/appointment-edit.component';
import { AppointmentEditService } from 'app/main/apps/appointment/appointment-edit/appointment-edit.service';
import { AppointmentPreviewComponent } from 'app/main/apps/appointment/appointment-preview/appointment-preview.component';
import { AppointmentPreviewService } from 'app/main/apps/appointment/appointment-preview/appointment-preview.service';


// routing
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
        data: { path: 'appointment-view/:id', animation: 'AppointmentPreviewComponent' }
    },
    {
        path: 'edit/:id',
        component: AppointmentEditComponent,
        resolve: {
            Ses: AppointmentEditService
        },
        data: { path: 'appointment-view/:id', animation: 'AppointmentEditComponent' }
    },
    {
        path: 'preview',
        redirectTo: '/apps/appointment/preview/4989' // Redirection
    },
    {
        path: 'edit',
        redirectTo: '/apps/appointment/edit/4989' // Redirection
    }
];

@NgModule({
    declarations: [
        AppointmentAddComponent,
        AppointmentListComponent,
        AppointmentPreviewComponent,
        AppointmentEditComponent,
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
        CoreSidebarModule
    ],
    providers: [AppointmentListService, AppointmentPreviewService, AppointmentEditService, AppointmentAddService],
    exports: [AppointmentListComponent]
})
export class AppointmentDataModule { }

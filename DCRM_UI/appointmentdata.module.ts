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

import { AppointmentListComponent } from 'app/main/clinic-admin/appointment/appointment-list/appointment-list.component';
import { AppointmentListService } from 'app/main/clinic-admin/appointment/appointment-list/appointment-list.service';

import { AppointmentChairComponent } from 'app/main/clinic-admin/appointment/appointment-chair/appointment-chair.component';
import { AppointmentChairService } from 'app/main/clinic-admin/appointment/appointment-chair/appointment-chair.service';

import { AppointmentAddComponent } from 'app/main/clinic-admin/appointment/appointment-add/appointment-add.component';
import { AppointmentAddService } from 'app/main/clinic-admin/appointment/appointment-add/appointment-add.service';

import { AppointmentEditComponent } from 'app/main/clinic-admin/appointment/appointment-edit/appointment-edit.component';
import { AppointmentEditService } from 'app/main/clinic-admin/appointment/appointment-edit/appointment-edit.service';

import { AppointmentPreviewComponent } from 'app/main/clinic-admin/appointment/appointment-preview/appointment-preview.component';
import { AppointmentPreviewService } from 'app/main/clinic-admin/appointment/appointment-preview/appointment-preview.service';


// routing
const routes: Routes = [
    {
        path: 'chair-view',
        component: AppointmentChairComponent,
        resolve: {
            Sas: AppointmentChairService,
        }
    },
    {
        path: 'add',
        component: AppointmentAddComponent,
        resolve: {
            Sas: AppointmentAddService
        }
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
        path: 'preview',
        redirectTo: '/drug/preview/4989' // Redirection
    },
    {
        path: 'edit',
        redirectTo: '/drug/edit/4989' // Redirection
    }
];

@NgModule({
    declarations: [
        AppointmentAddComponent,
        AppointmentListComponent,
        AppointmentPreviewComponent,
        AppointmentEditComponent,
        AppointmentChairComponent,
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
    providers: [AppointmentListService, AppointmentChairService, AppointmentPreviewService, AppointmentEditService, AppointmentAddService],
    exports: [AppointmentListComponent]
})
export class AppointmentDataModule { }

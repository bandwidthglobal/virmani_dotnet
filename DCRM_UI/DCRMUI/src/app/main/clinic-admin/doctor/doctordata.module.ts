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

import { DoctorListComponent } from 'app/main/clinic-admin/doctor/doctor-list/doctor-list.component';
import { DoctorListService } from 'app/main/clinic-admin/doctor/doctor-list/doctor-list.service';

import { DoctorAddComponent } from 'app/main/clinic-admin/doctor/doctor-add/doctor-add.component';
import { DoctorAddService } from 'app/main/clinic-admin/doctor/doctor-add/doctor-add.service';

import { DoctorEditComponent } from 'app/main/clinic-admin/doctor/doctor-edit/doctor-edit.component';
import { DoctorEditService } from 'app/main/clinic-admin/doctor/doctor-edit/doctor-edit.service';
import { DoctorPreviewComponent } from 'app/main/clinic-admin/doctor/doctor-preview/doctor-preview.component';
import { DoctorPreviewService } from 'app/main/clinic-admin/doctor/doctor-preview/doctor-preview.service';
import { SharedCommonModule } from 'app/shared-common/shared-ui.module';
import { MaskModule } from 'app/shared-common/directives/mask/mask.module';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';


// routing
const routes: Routes = [
    {
        path: 'add',
        component: DoctorAddComponent,
        resolve: {
            Sas: DoctorAddService
        },
        data: { animation: 'DoctorAddComponent' }
    },
    {
        path: 'list',
        component: DoctorListComponent,
        resolve: {
            uls: DoctorListService
        },
        data: { animation: 'DoctorListComponent' }
    },
    {
        path: 'preview/:id',
        component: DoctorPreviewComponent,
        resolve: {
            Sds: DoctorPreviewService
        },
        data: { path: 'doctor-view/:id', animation: 'DoctorPreviewComponent' }
    },
    {
        path: 'edit/:id',
        component: DoctorEditComponent,
        resolve: {
            Ses: DoctorEditService
        },
        data: { path: 'doctor-view/:id', animation: 'DoctorEditComponent' }
    },
    {
        path: 'preview',
        redirectTo: '/admin/doctor/preview/4989' // Redirection
    },
    {
        path: 'edit',
        redirectTo: '/admin/doctor/edit/4989' // Redirection
    }
];

@NgModule({
    declarations: [
        DoctorAddComponent,
        DoctorListComponent,
        DoctorPreviewComponent,
        DoctorEditComponent,
        DoctorFormComponent
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
        SharedCommonModule,
        MaskModule
    ],
    providers: [DoctorListService, DoctorPreviewService, DoctorEditService, DoctorAddService],
    exports: [DoctorListComponent]
})
export class DoctorDataModule { }

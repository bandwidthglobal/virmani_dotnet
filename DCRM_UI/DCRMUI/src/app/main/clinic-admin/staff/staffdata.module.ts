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

import { StaffListComponent } from 'app/main/clinic-admin/staff/staff-list/staff-list.component';
import { StaffListService } from 'app/main/clinic-admin/staff/staff-list/staff-list.service';

import { StaffAddComponent } from 'app/main/clinic-admin/staff/staff-add/staff-add.component';
import { StaffAddService } from 'app/main/clinic-admin/staff/staff-add/staff-add.service';

import { StaffEditComponent } from 'app/main/clinic-admin/staff/staff-edit/staff-edit.component';
import { StaffEditService } from 'app/main/clinic-admin/staff/staff-edit/staff-edit.service';

import { StaffPreviewComponent } from 'app/main/clinic-admin/staff/staff-preview/staff-preview.component';
import { StaffPreviewService } from 'app/main/clinic-admin/staff/staff-preview/staff-preview.service';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { SharedCommonModule } from 'app/shared-common/shared-ui.module';
import { MaskModule } from 'app/shared-common/directives/mask/mask.module';


// routing
const routes: Routes = [
    {
        path: 'add',
        component: StaffAddComponent,
        resolve: {
            Sas: StaffAddService
        },
        data: { animation: 'StaffAddComponent' }
    },
    {
        path: 'list',
        component: StaffListComponent,
        resolve: {
            uls: StaffListService
        },
        data: { animation: 'StaffListComponent' }
    },
    {
        path: 'preview/:id',
        component: StaffPreviewComponent,
        resolve: {
            Sds: StaffPreviewService
        },
        data: { path: 'user-view/:id', animation: 'StaffPreviewComponent' }
    },
    {
        path: 'edit/:id',
        component: StaffEditComponent,
        resolve: {
            Ses: StaffEditService
        },
        data: { path: 'user-view/:id', animation: 'StaffEditComponent' }
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
        StaffAddComponent,
        StaffListComponent,
        StaffPreviewComponent,
        StaffEditComponent,
        StaffFormComponent
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
    providers: [StaffListService, StaffPreviewService, StaffEditService, StaffAddService],
    exports: [StaffListComponent]
})
export class StaffDataModule { }

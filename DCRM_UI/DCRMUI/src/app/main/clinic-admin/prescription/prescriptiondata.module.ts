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

import { PrescriptionListComponent } from 'app/main/clinic-admin/prescription/prescription-list/prescription-list.component';
import { PrescriptionListService } from 'app/main/clinic-admin/prescription/prescription-list/prescription-list.service';

import { PrescriptionAddComponent } from 'app/main/clinic-admin/prescription/prescription-add/prescription-add.component';
import { PrescriptionAddService } from 'app/main/clinic-admin/prescription/prescription-add/prescription-add.service';

//import { PrescriptionEditComponent } from 'app/main/clinic-admin/prescription/prescription-edit/prescription-edit.component';
//import { PrescriptionEditService } from 'app/main/clinic-admin/prescription/prescription-edit/prescription-edit.service';

import { PrescriptionPreviewComponent } from 'app/main/clinic-admin/prescription/prescription-preview/prescription-preview.component';
import { PrescriptionPreviewService } from 'app/main/clinic-admin/prescription/prescription-preview/prescription-preview.service';


// routing
const routes: Routes = [
    {
        path: 'add',
        component: PrescriptionAddComponent,
        resolve: {
            Sas: PrescriptionAddService
        },
        data: { animation: 'PrescriptionAddComponent' }
    },
    {
        path: 'list',
        component: PrescriptionListComponent,
        resolve: {
            uls: PrescriptionListService
        },
        data: { animation: 'PrescriptionListComponent' }
    },
    {
        path: 'preview/:id',
        component: PrescriptionPreviewComponent,
        resolve: {
            Sds: PrescriptionPreviewService
        },
        data: { path: 'user-view/:id', animation: 'PrescriptionPreviewComponent' }
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
        PrescriptionAddComponent,
        PrescriptionListComponent,
        PrescriptionPreviewComponent,
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
    providers: [PrescriptionListService, PrescriptionPreviewService,  PrescriptionAddService],
    exports: [PrescriptionListComponent]
})
export class PrescriptionDataModule { }

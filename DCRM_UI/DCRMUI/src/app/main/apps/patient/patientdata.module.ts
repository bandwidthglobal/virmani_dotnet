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

//import { PatientListComponent } from 'app/main/apps/patient/patient-list/patient-list.component';
//import { PatientListService } from 'app/main/apps/patient/patient-list/patient-list.service';

//import { PatientAddComponent } from 'app/main/apps/patient/patient-add/patient-add.component';
//import { PatientAddService } from 'app/main/apps/patient/patient-add/patient-add.service';

//import { PatientEditComponent } from 'app/main/apps/patient/patient-edit/patient-edit.component';
//import { PatientEditService } from 'app/main/apps/patient/patient-edit/patient-edit.service';

//import { PatientPreviewComponent } from 'app/main/apps/patient/patient-preview/patient-preview.component';
//import { PatientPreviewService } from 'app/main/apps/patient/patient-preview/patient-preview.service';


// routing
const routes: Routes = [
    //{
    //    path: 'add',
    //    component: PatientAddComponent,
    //    resolve: {
    //        Sas: PatientAddService
    //    },
    //    data: { animation: 'PatientAddComponent' }
    //},
    //{
    //    path: 'list',
    //    component: PatientListComponent,
    //    resolve: {
    //        uls: PatientListService
    //    },
    //    data: { animation: 'PatientListComponent' }
    //},
    //{
    //    path: 'preview/:id',
    //    component: PatientPreviewComponent,
    //    resolve: {
    //        Sds: PatientPreviewService
    //    },
    //    data: { path: 'user-view/:id', animation: 'PatientPreviewComponent' }
    //},
    //{
    //    path: 'edit/:id',
    //    component: PatientEditComponent,
    //    resolve: {
    //        Ses: PatientEditService
    //    },
    //    data: { path: 'user-view/:id', animation: 'PatientEditComponent' }
    //},
    //{
    //    path: 'preview',
    //    redirectTo: '/apps/patient/preview/4989' // Redirection
    //},
    //{
    //    path: 'edit',
    //    redirectTo: '/apps/patient/edit/4989' // Redirection
    //}
];

@NgModule({
    declarations: [
        //PatientAddComponent,
        //PatientListComponent,
        //PatientPreviewComponent,
        //PatientEditComponent,
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
    providers: [],
    exports: []
})
export class PatientDataModule { }

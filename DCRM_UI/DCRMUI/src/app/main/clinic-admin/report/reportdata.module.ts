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

import { ReportComponent } from 'app/main/clinic-admin/report/report-list.component';
import { ReportService } from 'app/main/clinic-admin/report/report-list.service';

import { PatientWorkdoneListComponent } from 'app/main/clinic-admin/report/patient-workdone-list/patient-workdone-list.component';
import { PatientWorkdonelistService } from 'app/main/clinic-admin/report/patient-workdone-list/patient-workdone-list.service';

import { PatientWorkDoneComponent } from 'app/main/clinic-admin/report/patient-workdone/patient-workdone.component';
import { PatientWorkDoneService } from 'app/main/clinic-admin/report/patient-workdone/patient-workdone.service';

import { PatientWorkdoneDetailsComponent } from 'app/main/clinic-admin/report/patient-workdone-details/patient-workdone-details.component'
import { PatientWorkdoneDetailsService } from 'app/main/clinic-admin/report/patient-workdone-details/patient-workdone-details.service';

// routing
const routes: Routes = [
    {
        path: '',
        component: ReportComponent,
        resolve: {
            Sas: ReportService
        },
    },
    {
        path: 'patient-workdones',
        component: PatientWorkdoneListComponent,
        resolve: {
            Sas: PatientWorkdonelistService
        },
    },
    {
        path: 'patient-workdone',
        component: PatientWorkDoneComponent,
        resolve: {
            Sas: PatientWorkDoneService
        },
    },
    {
        path: 'patient-workdone-list',
        component: PatientWorkDoneComponent,
        resolve: {
            Sas: PatientWorkDoneService
        },
    },
    {
        path: 'patient-workdone-download/:id',
        component: PatientWorkdoneDetailsComponent,
        resolve: {
            Sas: PatientWorkdoneDetailsService
        },
    }
];

@NgModule({
    declarations: [
        ReportComponent,
        PatientWorkdoneListComponent,
        PatientWorkDoneComponent,
        PatientWorkdoneDetailsComponent
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
    providers: [ReportService, PatientWorkDoneService, PatientWorkdonelistService, PatientWorkdoneDetailsService],
    exports: [ReportComponent]
})
export class ReportDataModule { }

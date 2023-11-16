// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { ComomnMasterData } from "../../clinic-admin/comomnmasterdata";
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedCommonModule } from 'app/shared-common/shared-ui.module';
import { MaskModule } from 'app/shared-common/directives/mask/mask.module';
import { HotCodeMenuComponent } from './patient-preview/treatment-paln/form-page/hot-code-menu.component';

import { PatientListComponent } from 'app/main/clinic-admin/patient/patient-list/patient-list.component';
import { PatientListService } from 'app/main/clinic-admin/patient/patient-list/patient-list.service';

import { PatientAddComponent } from 'app/main/clinic-admin/patient/patient-add/patient-add.component';
import { PatientAddService } from 'app/main/clinic-admin/patient/patient-add/patient-add.service';

import { PatientEditComponent } from 'app/main/clinic-admin/patient/patient-edit/patient-edit.component';
import { PatientEditService } from 'app/main/clinic-admin/patient/patient-edit/patient-edit.service';

import { PatientPreviewComponent } from 'app/main/clinic-admin/patient/patient-preview/patient-preview.component';
import { PatientPreviewService } from 'app/main/clinic-admin/patient/patient-preview/patient-preview.service';

import { PatientinfoComponent } from 'app/main/clinic-admin/patient/patient-preview/patientinfo/patientinfo.component';
import { PatientAppointmentsComponent } from 'app/main/clinic-admin/patient/patient-preview/patient-appointments/patient-appointments.component';
import { PatientinAppointmentsService } from 'app/main/clinic-admin/patient/patient-preview/patient-appointments/patient-appointments.service';
import { LabComponent } from 'app/main/clinic-admin/patient/patient-preview/lab/lab.component';
import { DigitaldataComponent } from 'app/main/clinic-admin/patient/patient-preview/digitaldata/digitaldata.component';
import { PriscriptionsComponent } from 'app/main/clinic-admin/patient/patient-preview/priscriptions/priscriptions.component';
import { PaymentsComponent } from 'app/main/clinic-admin/patient/patient-preview/payments/payments.component';
import { TreatmentPalnComponent } from 'app/main/clinic-admin/patient/patient-preview/treatment-paln/treatment-paln.component';
import { WorkdoneHistoryComponent } from 'app/main/clinic-admin/patient/patient-preview/workdonehistory/workdonehistory.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { TreatmentPlanFormComponent } from './patient-preview/treatment-paln/form-page/treatment-plan-form.component';
import { PatientPriscriptionsViewComponent } from './patient-prescriptions-view/patient-prescriptions-view.component';
import { PatientDownloadComponent } from 'app/main/clinic-admin/patient/patient-download/patient-download.component';
import { PatientDownloadService } from 'app/main/clinic-admin/patient/patient-download/patient-download.service';

// routing
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [] = [
    {
        path: 'add',
        component: PatientAddComponent,
        resolve: {
            Sas: PatientAddService
        },
        data: { animation: 'PatientAddComponent' }
    },
    {
        path: 'list',
        component: PatientListComponent,
        resolve: {
            uls: PatientListService
        },
        data: { animation: 'PatientListComponent' }
    },
    {
        path: 'preview/:id',
        component: PatientPreviewComponent,
        resolve: {
            Sds: PatientPreviewService
        },
    },
    {
        path: 'edit/:id',
        component: PatientEditComponent,
        resolve: {
            Ses: PatientEditService
        },
    },
    {
        path: 'priscriptions/:id',
        component: PatientPriscriptionsViewComponent,
        resolve: {
            Ses: PatientPreviewService
        },
    }
    ,
    {
        path: 'download/:id',
        component: PatientDownloadComponent,
        resolve: {
            Ses: PatientDownloadService
        },
    }
];

@NgModule({
    declarations: [
        PatientFormComponent,
        PatientAddComponent,
        PatientListComponent,
        PatientPreviewComponent,
        PatientEditComponent,
        PatientinfoComponent,
        PatientAppointmentsComponent,
        LabComponent,
        DigitaldataComponent,
        PriscriptionsComponent,
        TreatmentPalnComponent,
        PaymentsComponent,
        WorkdoneHistoryComponent,
        TreatmentPlanFormComponent,
        HotCodeMenuComponent,
        PatientPriscriptionsViewComponent
    ],
    imports: [
        // CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        // CoreDirectivesModule,
        Ng2FlatpickrModule,
        NgxDatatableModule,
        FormsModule,
        CorePipesModule,
        NgbModule,
        NgSelectModule,
        CoreSidebarModule,
        SharedCommonModule,
        MaskModule,
        MatDialogModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
    ],
    providers: [PatientListService, ComomnMasterData, PatientPreviewService, PatientEditService, PatientAddService, PatientinAppointmentsService, PatientDownloadService],
    exports: [PatientListComponent]
})
export class PatientDataModule { }

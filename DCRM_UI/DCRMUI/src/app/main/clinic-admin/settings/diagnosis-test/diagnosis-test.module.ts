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

import { DiagnosisTestListComponent } from 'app/main/clinic-admin/settings/diagnosis-test/diagnosis-test-list/diagnosis-test-list.component';
import { DiagnosisTestListService } from 'app/main/clinic-admin/settings/diagnosis-test/diagnosis-test-list/diagnosis-test-list.service';
import { DiagnosisTestFormComponent } from 'app/main/clinic-admin/settings/diagnosis-test/diagnosis-test-form/diagnosis-test-form.component';
import { DiagnosisTestFormService } from 'app/main/clinic-admin/settings/diagnosis-test/diagnosis-test-form/diagnosis-test-form.service'


// routing
const routes: Routes = [
    {
        path: 'add',
        component: DiagnosisTestFormComponent,
        resolve: {
            Sas: DiagnosisTestFormService
        },
    },
    {
        path: 'list',
        component: DiagnosisTestListComponent,
        resolve: {
            uls: DiagnosisTestListService
        },
    },
    {
        path: 'edit/:id',
        component: DiagnosisTestFormComponent,
        resolve: {
            Sds: DiagnosisTestFormService
        },
    },
];

@NgModule({
    declarations: [
        DiagnosisTestFormComponent,
        DiagnosisTestListComponent,
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
    providers: [DiagnosisTestFormService, DiagnosisTestListService],
})
export class DiagnosisTestDataModule { }

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


// routing
const routes: Routes = [
    {
        path: '',
        component: ReportComponent,
        resolve: {
            Sas: ReportService
        },
        data: { animation: 'StaffAddComponent' }
    }
];

@NgModule({
    declarations: [
        ReportComponent
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
    providers: [ReportService],
    exports: [ReportComponent]
})
export class ReportDataModule { }

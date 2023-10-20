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

import { DashboardComponent } from 'app/main/clinic-admin/dashboard/dashboard-details/dashboard.component';
import { DashboardService } from 'app/main/clinic-admin/dashboard/dashboard-details/dashboard.service';

// routing
const routes: Routes = [
   
    {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: {
            uls: DashboardService
        },
        data: { animation: 'DashboardComponent' }
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
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
    providers: [DashboardService],
    exports: [DashboardComponent]
})
export class DashboardDataModule { }

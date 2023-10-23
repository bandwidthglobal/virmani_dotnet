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

import { DrugListComponent } from 'app/main/clinic-admin/drug/drug-list/drug-list.component';
import { DrugListService } from 'app/main/clinic-admin/drug/drug-list/drug-list.service';

import { DrugAddComponent } from 'app/main/clinic-admin/drug/drug-add/drug-add.component';
import { DrugAddService } from 'app/main/clinic-admin/drug/drug-add/drug-add.service';

import { DrugEditComponent } from 'app/main/clinic-admin/drug/drug-edit/drug-edit.component';
import { DrugEditService } from 'app/main/clinic-admin/drug/drug-edit/drug-edit.service';

import { DrugPreviewComponent } from 'app/main/clinic-admin/drug/drug-preview/drug-preview.component';
import { DrugPreviewService } from 'app/main/clinic-admin/drug/drug-preview/drug-preview.service';
import { StockListComponent } from 'app/main/clinic-admin/drug/drug-preview/stock/stock-list.component';
import { BadStockListComponent } from 'app/main/clinic-admin/drug/drug-preview/bad-stock/bad-stock-list.component';

// routing
const routes: Routes = [
    {
        path: 'add',
        component: DrugAddComponent,
        resolve: {
            Sas: DrugAddService
        },
        data: { animation: 'DrugAddComponent' }
    },
    {
        path: 'list',
        component: DrugListComponent,
        resolve: {
            uls: DrugListService
        },
        data: { animation: 'DrugListComponent' }
    },
    {
        path: 'preview/:id',
        component: DrugPreviewComponent,
        resolve: {
            Sds: DrugPreviewService
        },
        data: { path: 'user-view/:id', animation: 'DrugPreviewComponent' }
    },
    {
        path: 'edit/:id',
        component: DrugEditComponent,
        resolve: {
            Ses: DrugEditService
        },
        data: { path: 'user-view/:id', animation: 'DrugEditComponent' }
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
        DrugAddComponent,
        DrugListComponent,
        DrugPreviewComponent,
        DrugEditComponent,
        StockListComponent,
        BadStockListComponent
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
    providers: [DrugListService, DrugPreviewService, DrugEditService, DrugAddService],
    exports: [DrugListComponent]
})
export class DrugDataModule { }

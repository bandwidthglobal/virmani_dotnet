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
import { FullCalendarModule } from '@fullcalendar/angular';

//import { ChairListComponent } from 'app/main/clinic-admin/settings/chairs/chair-list/chair-list.component';
//import { ChairListService } from 'app/main/clinic-admin/settings/chairs/chair-list/chair-list.service';

//import { ChairAddComponent } from 'app/main/clinic-admin/settings/chairs/chair-add/chair-add.component';
//import { ChairAddService } from 'app/main/clinic-admin/settings/chairs/chair-add/chair-add.service'

//import { ChairEditComponent } from 'app/main/clinic-admin/settings/chairs/chair-edit/chair-edit.component';
//import { ChairEditService } from 'app/main/clinic-admin/settings/chairs/chair-edit/chair-edit.service'



// routing
const routes: Routes = [
    {
        path: 'chair',
        loadChildren: () => import('./chairs/chairdata.module').then(m => m.ChairDataModule)
    }
    //{
    //    path: 'chair/add',
    //    component: ChairAddComponent,
    //    resolve: {
    //        Sas: ChairAddService
    //    },
    //},
    //{
    //    path: 'chair/list',
    //    component: ChairListComponent,
    //    resolve: {
    //        uls: ChairListService
    //    },
    //},
    //{
    //    path: 'chair/edit/:id',
    //    component: ChairEditComponent,
    //    resolve: {
    //        Sds: ChairEditService
    //    },
    //},
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SettingDataModule { }

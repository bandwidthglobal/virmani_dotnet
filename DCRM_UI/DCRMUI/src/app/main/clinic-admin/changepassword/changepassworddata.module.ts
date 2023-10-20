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

import { ChangepasswordComponent } from 'app/main/clinic-admin/changepassword/changepassword.component';
import { ChangepasswordService } from 'app/main/clinic-admin/changepassword/changepassword.service';


// routing
const routes: Routes = [
    {
        path: '',
        component: ChangepasswordComponent,
        resolve: {
            Sas: ChangepasswordService
        },
       
    }
];

@NgModule({
    declarations: [
        ChangepasswordComponent
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
    providers: [ChangepasswordService],
    exports: [ChangepasswordComponent]
})
export class ChangePasswordDataModule { }

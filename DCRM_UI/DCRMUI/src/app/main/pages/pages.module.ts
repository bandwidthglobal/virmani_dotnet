import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { KbModule } from './kb/kb.module';
import { BlogModule } from './blog/blog.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { ProfileModule } from './profile/profile.module';
import { PricingModule } from './pricing/pricing.module';
import { FaqModule } from 'app/main/pages/faq/faq.module';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';

import { AccountSettingsModule } from './account-settings/account-settings.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { DealerModule } from './dealer/dealer.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CoreCommonModule,
        ContentHeaderModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        AuthenticationModule,
        MiscellaneousModule,
        Ng2FlatpickrModule,
        PricingModule,
        BlogModule,
        ProfileModule,
        KbModule,
        FaqModule,
        AccountSettingsModule,
        PatientModule,
        DoctorModule,
        InvoiceModule,
        DealerModule,
      

    ],

    providers: []
})
export class PagesModule { }

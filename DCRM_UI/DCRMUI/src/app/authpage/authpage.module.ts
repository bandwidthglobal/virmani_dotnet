import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { FaqModule } from 'app/main/pages/faq/faq.module';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { AuthenticationModule } from './authentication/authentication.module';


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
        FaqModule,
        InvoiceModule,
    ],

    providers: []
})
export class AuthPagesModule { }

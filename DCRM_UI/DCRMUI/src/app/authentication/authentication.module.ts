import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { ForgotPasswordComponent } from 'app/main/pages/authentication/forgotpassword/forgotpassword.component';
import { LoginComponent } from 'app/main/pages/authentication/login/login.component';
import { RegisterComponent } from 'app/main/pages/authentication/register/register.component';

// routing
const routes: Routes = [
  {
    path: 'forgotpassword',
        component: ForgotPasswordComponent
  },
    {
        path: 'login',
        component: LoginComponent
    },
  {
      path: 'register',
      component: RegisterComponent
  },
];

@NgModule({
  declarations: [
        ForgotPasswordComponent,
        LoginComponent,
        RegisterComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule]
})
export class AuthenticationModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// routing
const routes: Routes = [
    {
        path: 'chair',
        loadChildren: () => import('./chairs/chairdata.module').then(m => m.ChairDataModule)
    },
    {
        path: 'diagnosistests',
        loadChildren: () => import('./diagnosis-test/diagnosis-test.module').then(m => m.DiagnosisTestDataModule)
    },
     {
         path: 'prosthesistype',
         loadChildren: () => import('./prosthesis-type/prosthesis-type.module').then(m => m.ProsthesisTypeDataModule)
    },
    {
        path: 'masterdata',
        loadChildren: () => import('./master-data/master-data.module').then(m => m.MasterDataModule)
   }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SettingDataModule { }

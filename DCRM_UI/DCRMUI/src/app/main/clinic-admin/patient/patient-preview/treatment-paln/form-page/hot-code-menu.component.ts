import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource } from "@angular/material/tree";
import { Component, Input, Output, OnInit, ViewEncapsulation, EventEmitter } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-hot-code-menu',
    templateUrl: './hot-code-menu.component.html',
    styleUrls: ['./hot-code-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // imports: [MatIconModule]
})

export class HotCodeMenuComponent implements OnInit {

    // TREE_DATA: any = [
    //     {
    //         name: 'Diagnostic',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Clinical Oral Evaluations',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Periodic oral evaluation',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Limited Oral Evaluation Problem Focused',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Comprehensive Oral Evaluation – New Or Established Patient',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Comprehensive Periodontal Evaluation – New Or Established Patient',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             }
    //         ],
    //     },
    //     {
    //         name: 'Preventive',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Prophylaxis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Topical application of fluoride',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Nutritional counseling for control of dental disease',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Tobacco counseling',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Oral hygiene instructions',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Sealant',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Space maintainer',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Re-cementation of space maintainer',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Restorative',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Amalgam Restorations',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'One surface',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Two surface',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Three surface',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Four surface or more',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Composite Restorations – Direct',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Anterior',
    //                         children: [
    //                             {
    //                                 name: 'One surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Two surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Three surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Four or more surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown composite',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Composite Restorations – Direct',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Posterior',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'One surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Two surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Three surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Four or more surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Inlay/Onlay Restorations',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Inlay -Metallic',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'One surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Two surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Three Or More Surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Onlay – Metallic',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Two surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Three surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Four Or More Surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Inlay - Ceramic',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'One surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Two surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Three Or More Surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Onlay - Ceramic',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Two surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Three surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Four Or More Surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Inlay - Composite',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'One surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Two surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Three Or More Surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Onlay - Composite',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Two surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Three surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Four Or More Surface',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Resin',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Resin-based composite (indirect',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Resin on metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Provisional crown',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Porcelin',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Porcelain -> Porcelain on ceramic substrate (e.g.Emax layer)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Porcelain fused to  base metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Porcelain fused to noble metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Metal',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Full cast  base metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Full cast high noble metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Titanium',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Primary Tooth',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Primary tooth porcelain/ceramic Prefabricated  crown',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Primary tooth  stainless steel Prefabricated crown',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Crowns - Single',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Other Restorative Services',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Recement inlay, onlay',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Recement crown',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Core buildup, including any pins',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Post removal',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Labial veneer (resin laminate) – chairside',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Labial veneer (resin laminate) – laboratory',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Labial veneer (porcelain laminate) – laboratory',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Veneer repair necessitated by restorative material failure',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Unspecified restorative procedure, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Endodontics',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Pulp Capping',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Pulp cap ? direct (excluding final restoration)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Pulp cap ? indirect (excluding final restoration)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Pulpotomy',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Pulpotomy -removal of pulp coronal to the dentinocemental Junction',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Partial pulpotomy for apexogenesis ? permanent tooth with incomplete root development',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Endodontic Therapy',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Primary Teeth',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Primary Teeth -> Pulpal therapy (resorbable filling) ? anterior, primary tooth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Primary Teeth -> Pulpal therapy (resorbable filling) ? posterior, primary tooth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Permanent Teeth',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Anterior tooth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Bicuspid tooth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Molar',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Permanent Teeth -> Treatment of root canal obstruction; non-surgical access',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Incomplete endodontic therapy; inoperable, unrestorable or fractured tooth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Internal root repair of perforation defects',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Endodontic Retreatment',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Apexification/recalcification/pulpal regeneration',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Initial visit (apical closure/calcific repair of perforations, root resorption, pulp space disinfection, etc.)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Interim medication replacement',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Final visit (includes completed root canal therapy ? apical closure/calcific repair of perforations, root resorption, etc.)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Pulpal regeneration',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Completion of regenerative treatment in an immature permanent tooth with a necrotic pulp',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Anterior',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Bicuspid',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Molar',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Apicoectomy/Periradicular Services',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Anterior',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Bicuspid',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Molar',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Reimplant',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Intentional reimplantation (including necessary splinting)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Other Endodontic Procedures',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Unspecified endodontic procedure, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         name: 'Periodontics',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Surgical Services',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Gingivectomy or Gingivoplasty',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Four or more contiguous teeth or tooth bounded spaces per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'One to three contiguous teeth or tooth bounded spaces per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'To allow access for restorative procedure, per tooth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Anatomical crown exposure',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Four or more contiguous teeth per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'One to three teeth per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Flap procedure, including root planing',
    //                         children: [
    //                             {
    //                                 name: 'Four or more contiguous teeth or tooth bounded spaces per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'One to three contiguous teeth or tooth bounded spaces per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Apically positioned flap',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Clinical crown lengthening ? hard tissue',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Osseous surgery',
    //                         children: [
    //                             {
    //                                 name: 'Four or more contiguous teeth or tooth bounded spaces per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'One to three contiguous teeth or tooth bounded spaces per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Bone replacement graft',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Guided tissue regeneration',
    //                         children: [
    //                             {
    //                                 name: 'Resorbable barrier',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Nonresorbable barrier',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Pedicle soft tissue graft procedure',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Pedicle soft tissue graft procedure',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Soft tissue allograft',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Non-Surgical Periodontal Service',
    //                 children: [
    //                     {
    //                         name: 'Provisional splinting',
    //                         children: [
    //                             {
    //                                 name: 'Intracoronal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Extracoronal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Periodontal scaling and root planing',
    //                         children: [
    //                             {
    //                                 name: 'Four or more teeth per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'One to three teeth per quadrant',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Other Periodontal Services',
    //                         children: [
    //                             {
    //                                 name: 'Unspecified periodontal procedure, by report',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         name: 'Prosthodontics (removable)',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Complete Dentures (Including Routine Post-Delivery Care)',
    //                 children: [
    //                     {
    //                         name: 'Complete Denture',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Immediate Complete Denture',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Partial Dentures (Including Routine Post-delivery Care)',
    //                 children: [
    //                     {
    //                         name: 'Resin Base',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Cast Metal Framework With Resin',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Flexible Base',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Adjustments to Dentures',
    //                 children: [
    //                     {
    //                         name: 'Complete Denture',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Partial Denture',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Repairs',
    //                 children: [
    //                     {
    //                         name: 'Complete Dentures',
    //                         children: [
    //                             {
    //                                 name: 'Repair Broken Complete Denture Base',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Replace Missing Or Broken Teeth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Partial Dentures',
    //                         children: [
    //                             {
    //                                 name: 'Resin Denture Base',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Cast Framework',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Broken Clasp',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Replace Broken Teeth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Add Tooth To Existing Partial Denture',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Add Clasp To Existing Partial Denture',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Replace All Teeth And Acrylic On Cast Metal Framework (Maxillary)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Replace All Teeth And Acrylic On Cast Metal Framework (Mandibular)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Denture Rebase Procedures',
    //                 children: [
    //                     {
    //                         name: 'Ccomplete',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary Denture',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular Denture',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Partial Denture',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary Partial Denture',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular Partial Denture',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Denture Reline Procedures',
    //                 children: [
    //                     {
    //                         name: 'Complete Denture',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary Complete Chairside',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular Complete Chairside',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Maxillary Complete Laboratory',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular Complete Laboratory',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Partial Denture',
    //                         children: [
    //                             {
    //                                 name: 'Maxillary Partial Chairside',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular Partial Chairside',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Maxillary Partial Laboratory',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandibular Partial Laboratory',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Interim Prosthesis',
    //                 children: [
    //                     {
    //                         name: 'Complete Denture',
    //                         children: [
    //                             {
    //                                 name: 'Interim Complete Denture (Maxillary)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Interim Complete Denture (Mandibular)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Partial Denture',
    //                         children: [
    //                             {
    //                                 name: 'Interim Partial Denture (Maxillary)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Interim Partial Denture (Mandibular)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Other Removable Prosthetic Services',
    //                 children: [
    //                     {
    //                         name: 'Tissue Conditioning, Maxillary',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Tissue Conditioning, Mandibular',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Overdenture ? Complete, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Overdenture ? Partial, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Precision Attachment, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Unspecified Removable Prosthodontic Procedure, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Maxillofacial Prosthetics',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Facial Moulage (Sectional)',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Facial Moulage (Complete)',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Nasal Prosthesis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Auricular Prosthesis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Orbital Prosthesis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Ocular Prosthesis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Facial Prosthesis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Nasal Septal Prosthesis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Ocular Prosthesis, Interim',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Cranial Prosthesis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Facial Augmentation Implant Prosthesis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Nasal Pros Thesis, Replacement',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Auricular Prosthesis, Replacement',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Orbital Prosthesis, Replacement',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Facial Prosthesis, Replacement',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Obturator Prosthesis, Surgical',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Obturator Prosthesis, Definitive',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Obturator Prosthesis, Modification',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Mandibular Resection Prosthesis With Guide Flange',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Mandibular Resection Prosthesis Without Guide Flange',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Obturator Prosthesis, Interim',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Trismus Appliance (Not For TMD Treatment)',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Feeding Aid',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Speech Aid Prosthesis, Pediatric',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Speech aid Prosthesis, Adult',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Palatal Augmentation Prosthesis',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Palatal Lift Prosthesis, Definitive',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Palatal Lift Prosthesis, Interim',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Palatal Lift Prosthesis, Modification',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Speech Aid Prosthesis, Modification',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Surgical Stent',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Radiation Carrier',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Radiation Shield',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Radiation Conelocator',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Fluoride Gel Carrier',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Commissure Splint',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Surgical Splint',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Topical Medicament Carrier',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: '>Adjust Maxillofacial Prosthetic Appliance, By Report',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Maintenance And Cleaning Of A Maxillofacial Prosthesis By Report',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //             {
    //                 name: 'Unspecified Maxillofacial Prosthesis, By Report',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Implant Services',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Pre-Surgical Services',
    //                 children: [
    //                     {
    //                         name: 'Radiographic/Surgical Implant Index, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Surgical Services',
    //                 children: [
    //                     {
    //                         name: 'Surgical Placement Of Implant Body: Endosteal Implant',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Placement Of Interim Implant Body For Transitional Prosthesis',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant Removal, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Debridement Of S Periimplant Defect And Surface Cleaning Of Exposed Implant Surfaces,',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Debridement Of Osseous Contouring Of A Periimplant Defect',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Bone Graft For Repair Of Periimplant Defect Placement Of A Barrier Membrane Or Biologic Materials To Aid In Osseous Regeneration',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Bone Graft At Time Of Implant Placement',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Interim Abutment',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Connecting Bar ? Implant Supported Or Abutment Supported',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Prefabricated Abutment ? Includes Modification And Placement',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Custom Abutment ? Includes Placement Implant/Abutment Supported Removable Dentures',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant/Abutment Supported Removable Denture For Completely Edentulous Arch',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant/Abutment Supported Removable Denture For Partially Edentulous Arch Implant /Abutment Supported Fixed Dentures (Hybrid Prosthesis)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant/Abutment Supported Fixed Denture For Completely Edentulous Arch',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant/Abutment Supported Fixed Denture For Partially Edentulous Arch, Single Crowns, Abutment Supported',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Porcelain/Ceramic Crown',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Porcelain Fused To Metal Crown (High Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Porcelain Fused To Metal Crown (Predominantly Base Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Porcelain Fused To Metal Crown (Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Cast Metal Crown (High Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Cast Metal Crown (Predominantly Base Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Cast Metal Crown (Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Crown ? (Titanium)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant Supported Porcelain/Ceramic Crown',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant Supported Porcelain Fused To Metal Crown (Titanium, Titanium Alloy, High Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant Supported Metal Crown (Titanium, Titanium Alloy, High Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Fixed Partial Denture, Abutment Supported',
    //                 children: [
    //                     {
    //                         name: 'Abutment Supported Retainer For Porcelain/Ceramic FPD',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Retainer For Porcelain Fused To Metal FPD (High Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Retainer For Porcelain Fused To Metal FPD (Predominantly Base Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Retainer For Porcelain Fused To Metal FPD (Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Retainer For Cast Metal FPD (High Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Retainer For Cast Metal FPD (Predominantly Base Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Retainer For Cast Metal FPD (Noble Metal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Abutment Supported Retainer Crown For FPD ? (Titanium)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Fixed Partial Denture, Implant Supported',
    //                 children: [
    //                     {
    //                         name: 'Implant Supported Retainer For Ceramic FPD',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant Supported Retainer For Porcelain Fused To Metal FPD ',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant Supported Retainer For Cast Metal FPD ',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant maintenance procedures, Including Removal Of Prosthesis, Cleansing Abutments And Reinsertion ',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Repair Implant Supported Prosthesis, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Repair Implant Abutment, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Replacement Of Semi-precision Or Precision Attachment ',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Recement Implant/Abutment Supported Crown',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Recement Implant/Abutment Supported Fixed Partial Denture',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Unspecified Implant procedure, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Prosthodontics, fixed',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Fixed Partial Denture Retainers ? Inlays/Onlays',
    //                 children: [
    //                     {
    //                         name: 'Retainer',
    //                         children: [
    //                             {
    //                                 name: 'Retainer ? Cast Metal For Resin Bonded Fixed Prosthesis',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Retainer ? porcelain/ceramic For Resin Bonded Fixed Prosthesis',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Inlay',
    //                         children: [
    //                             {
    //                                 name: 'Inlay ? Porcelain/Ceramic, Two Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Inlay ? Porcelain/Ceramic, Three Or More Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Inlay ? Cast High Noble Metal, Two Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Inlay ? Cast High Noble Metal, Three Or More Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Inlay ? Cast predominantly Base Metal, Two Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Inlay ? Cast predominantly Base Metal, Three Or More Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Inlay ? Cast noble Metal, Two Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Inlay ? Cast noble Metal, Three Or More Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Inlay ? Titanium',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Onlay',
    //                         children: [
    //                             {
    //                                 name: 'Onlay ? Porcelain/Ceramic, Two Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Onlay ? Porcelain/Ceramic, Three Or More Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Onlay ? Cast High Noble Metal, Two Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Onlay ? Cast High Noble Metal, Three Or More Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Onlay ? Cast predominantly Base Metal, Two Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Onlay ? Cast predominantly Base Metal, Three Or More Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Onlay ? Cast noble Metal, Two Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Onlay ? Cast noble Metal, Three Or More Surfaces',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Onlay ? Titanium',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Fixed Partial Denture Retainers ? Crowns',
    //                 children: [
    //                     {
    //                         name: 'Crowns',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                         children: [
    //                             {
    //                                 name: 'Crown ? Indirect Resin Based Composite',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? Resin with High Noble Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? Resin with Predominantly Base Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? Resin with Noble Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? Porcelain/Ceramic',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? Porcelain Fused To High Noble Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? Porcelain Fused To predominantly Base Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? Porcelain Fused To Noble Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? 3?4 Cast High Noble Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? 3?4 Cast Predominantly Base Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? 3?4 Cast Noble Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? 3?4 Porcelain/Ceramic',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? full Cast High Noble Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? full Cast Predominantly base Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? full Cast Noble Metal',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Provisional Retainer Crown ? Prior To Final Impression',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Crown ? Titanium',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Other Fixed Partial Denture Services',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Connector Bar',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Recement Fixed Partial Denture',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Stress Breaker',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Precision Attachment',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Coping',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Fixed Partial Denture Repair Necessitated By Restorative Material Failure',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Pediatric Partial Denture, Fixed',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Unspecified Fixed Prosthodontic Procedure, By Report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Oral and Maxillofacial Surgery',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Extractions (Includes local anesthesia, suturing, if needed, and routine postoperative care)',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Extraction, coronal remnants ? deciduous tooth',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                     },
    //                     {
    //                         name: 'Extraction, erupted tooth or exposed root (elevation and/or forceps removal)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                     },
    //                     {
    //                         name: 'Surgical removal of erupted tooth requiring removal of bone and/or sectioning of tooth, and including  elevation of mucoperiosteal flap if indicated',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                     },
    //                     {
    //                         name: 'Removal of impacted tooth ? soft tissue',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                     },
    //                     {
    //                         name: 'Removal of impacted tooth ? partially bony',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                     },
    //                     {
    //                         name: 'Removal of impacted tooth ? completely bony',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                     },
    //                     {
    //                         name: 'Removal of impacted tooth ? completely bony, with unusual surgical complications',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                     },
    //                     {
    //                         name: 'Surgical removal of residual tooth roots (cutting procedure)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                     },
    //                     {
    //                         name: 'Coronectomy ? intentional partial tooth removal',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Other Surgical Procedures',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Oroantral fistula closure',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Primary closure of a sinus perforation',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Tooth reimplantation and/or stabilization of accidentally evulsed or displaced tooth',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Tooth transplantation (includes reimplantation from one site to another and splinting and/or stabilization)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Surgical access of an unerupted tooth',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Mobilization of erupted or malpositioned tooth to aid eruption',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Placement of device to facilitate eruption of impacted tooth',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Biopsy of oral tissue ? hard (bone, tooth)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Biopsy of oral tissue ? soft',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Exfoliative cytological sample collection',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Brush biopsy ? transepithelial sample collection',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Surgical repositioning of teeth',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Transseptal fiberotomy/supra crestal fiberotomy, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Surgical placement: temporary anchorage device [screw retained plate] requiring surgical flap',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Surgical placement: temporary anchorage device requiring surgical flap',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Surgical placement: temporary anchorage device without surgical flap',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Harvest of bone fur use in autogenous grafting procedure',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Alveoloplasty ? Surgical Preparation of Ridge for Dentures',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Alveoloplasty in conjunction with extractions ? four or more teeth or tooth spaces, per quadrant',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Alveoloplasty in conjunction with extractions ? one to three teeth or tooth spaces, per quadrant',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Alveoloplasty not in conjunction with extractions ? four or more teeth or tooth spaces, per quadrant',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Alveoloplasty not in conjunction with extractions ? one to three teeth or tooth spaces, per quadrant',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Vestibuloplasty',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Vestibuloplasty ? ridge extension (secondary epithelialization)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Vestibuloplasty ? ridge extension (including soft tissue grafts, muscle reattachment, revision of soft tissue attachment and management of hypertrophied and hyperplastic tissue) Includes non-odontogenic cysts',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Excision of  Soft tissue lesion',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Excision of benign lesion up to 1.25 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Excision of benign lesion greater than 1.25 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Excision of benign lesion, complicated',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Excision of malignant lesion up to 1.25 cm CDT 2013',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Excision of malignant lesion greater than 1.25 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Excision of malignant lesion, complicated',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Destruction of lesion(s) by physical or chemical method, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Surgical Excision of Intra-Osseous Lesions',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Excision of malignant tumor ? lesion diameter up to 1.25 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Excision of malignant tumor ? lesion diameter greater than 1.25 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Removal of benign odontogenic cyst or tumor ? lesion diameter up to 1.25 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Removal of benign odontogenic cyst or tumor ? lesion diameter greater than 1.25 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Removal of benign nonodontogenic cyst or tumor ? lesion diameter up to 1.25 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Removal of benign nonodontogenic cyst or tumor ? lesion diameter greater than 1.25 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Removal of lateral exostosis (maxilla or mandible)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Removal of torus palatinus',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Removal of torus mandibularis',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Surgical reduction of osseous tuberosity',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Radical resection of maxilla or mandible',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Surgical Incision',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Incision and drainage of abscess ? intraoral soft tissue',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Incision and drainage of abscess ? intraoral soft tissue ? complicated (includes drainage of multiple fascial spaces)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Incision and drainage of abscess ? extraoral soft tissue',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Incision and drainage of abscess ? extraoral soft tissue ? complicated (includes drainage of multiple fascial spaces)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Removal of foreign body from mucosa, skin, or subcutaneous alveolar tissue',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Removal of reaction producing foreign bodies, musculoskeletal system',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Partial ostectomy/sequestrectomy for removal of non-vital bone',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Maxillary sinusotomy for removal of tooth fragment or foreign body',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Treatment of Fractures',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Simple',
    //                         children: [
    //                             {
    //                                 name: 'Maxilla ? open reduction (teeth immobilized, if present)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Maxilla ? closed reduction (teeth immobilized, if present)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandible ? open reduction (teeth immobilized, if present)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandible ? closed reduction (teeth immobilized, if present)',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Malar and/or zygomatic arch ? open reduction',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Malar and/or zygomatic arch ? closed reduction',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Alveolus ? closed reduction, may include stabilization of teeth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Alveolus ? open reduction, may include stabilization of teeth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Facial bones ? complicated reduction with fixation and multiple surgical approaches',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         name: 'Compound',
    //                         children: [
    //                             {
    //                                 name: 'Maxilla ? open reduction',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Maxilla ? closed reduction',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandible ? open reduction',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Mandible ? closed reduction',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Malar and/or zygomatic arch ? open reduction',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Malar and/or zygomatic arch ? closed reduction',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Alveolus ? open reduction stabilization of teeth',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Alveolus, closed reduction stabilization of teeth CDT 2013',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                             {
    //                                 name: 'Facial bones ? complicated reduction with fixation and multiple surgical approaches',
    //                                 job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Reduction of Dislocation and Management of Other Temporomandibular Joint Dysfunctions',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Open reduction of dislocation',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Closed reduction of dislocation',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Manipulation under anesthesia',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Condylectomy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Surgical discectomy, with/without implant',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Disc repair',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Synovectomy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Myotomy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Joint reconstruction',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Arthrotomy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Arthroplasty',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Arthrocentesis',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Non-arthroscopic lysis and lavage',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Arthroscopy ? diagnosis, with or without biopsy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Arthroscopy ? surgical: lavage and lysis of adhesions',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Arthroscopy ? surgical: disc repositioning and stabilization',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Arthroscopy ? surgical: synovectomy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Arthroscopy ? surgical: discectomy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Arthroscopy ? surgical: debridement',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Occlusal orthotic device, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Unspecified TMD therapy, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Repair of Traumatic Wounds',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Suture of recent small wounds up to 5 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Complicated suture ? up to 5 cm',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Complicated suture ? greater than 5 c"m',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Other Repair Procedures',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Skin graft (identify defect covered, location and type of graft)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Collection and application of autologous blood concentrate product',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Osteoplasty ? for orthognathic deformities',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Osteotomy ? mandibular rami',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Osteotomy ? mandibular rami with bone graft; includes obtaining the graft',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Osteotomy ? segmented or subapical',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Osteotomy ? body of mandible',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'LeFort I (maxilla ? total)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'LeFort I (maxilla ? segmented)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'LeFort II or LeFort III (osteoplasty of facial bones for midface hypoplasia or retrusion)-without bone graft',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'LeFort II or LeFort III ? with bone graft',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Osseous, osteoperiosteal, or cartilage graft of the mandible or maxilla ? autogenous or nonautogenous, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Sinus augmentation with bone or bone substitutes via a lateral open approach',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Sinus augmentation via a vertical approach',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Bone replacement graft for ridge preservation ? per site',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Repair of maxillofacial soft and/or hard tissue defect CDT 2013',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Frenulectomy ? also known as frenectomy or frenotomy ? separate procedure not incidental to another procedure',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Frenuloplasty',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Excision of hyperplastic tissue ? per arch',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Excision of pericoronal gingiva',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Surgical reduction of fibrous tuberosity',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Sialolithotomy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Excision of salivary gland, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Sialodochoplasty',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Closure of salivary fistula',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Emergency tracheotomy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Coronoidectomy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Synthetic graft ? mandible or facial bones, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Implant-mandible for augmentation purposes (excluding alveolar ridge), by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Appliance removal (not by dentist who placed appliance), includes removal of archbar',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Intraoral placement of a fixation device not in conjunction with a fracture',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Unspecified oral surgery procedure, by repor',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Orthodontics',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Limited Orthodontic Treatment',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Limited orthodontic treatment of the primary dentition',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Limited orthodontic treatment of the transitional dentition',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Limited orthodontic treatment of the adolescent dentition',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Limited orthodontic treatment of the adult dentition',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Interceptive Orthodontic Treatment',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Interceptive orthodontic treatment of the primary dentition',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Interceptive orthodontic treatment of the transitional dentition',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Comprehensive Orthodontic',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Comprehensive orthodontic treatment of the transitional dentition',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Comprehensive orthodontic treatment of the adolescent dentition',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Comprehensive orthodontic treatment of the adult dentition',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Minor Treatment to Control Harmful Habits',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Removable appliance therapy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Fixed appliance therapy',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Other Orthodontic Services',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Pre-orthodontic treatment visit',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Periodic orthodontic treatment visit (as part of contract)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Orthodontic retention (removal of appliances, construction and placement of retainer(s))',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Orthodontic treatment (alternative billing to a contract fee)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Repair of orthodontic appliance',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Replacement of lost or broken retainer',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Rebonding or recementing; and/or repair, as required, of fixed retainers',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Unspecified orthodontic procedure, by repor',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Adjunctive General Services',
    //         job_name: 'GIVEN JOB NAME FROM BACKEND',
    //         children: [
    //             {
    //                 name: 'Unclassified Treatment',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Palliative (emergency) treatment of dental pain ? minor procedure',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Fixed partial denture sectioning',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Anesthesia',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Local anesthesia not in conjunction with operative or surgical procedures',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Regional block anesthesia',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Trigeminal division block anesthesia',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Local anesthesia in conjunction with operative or surgical procedures',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Deep sedation/general anesthesia ? first 30 minutes',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Deep sedation/general anesthesia ? each additional 15 minutes',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Inhalation of nitrous oxide/anxiolysis, analgesia',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Intravenous conscious sedation/analgesia ? first 30 minutes',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Intravenous conscious sedation/analgesia ? each additional 15 minutes',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Non-intravenous conscious sedation',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Professional Consultation',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Consultation ? diagnostic service provided by dentist or physician other than requesting dentist or physician Professional Visits',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'House/extended care facility call',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'hospital or ambulatory surgical center call',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Office visit for observation (during regularly scheduled hours) ? no other services performed',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Office visit ? after regularly scheduled hours',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Case presentation, detailed and extensive treatment planni',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Drugs',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Therapeutic parenteral drug, single administration',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Therapeutic parenteral drugs, two or more administrations, different medications',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Other drugs and/or medicaments, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: 'Miscellaneous Services',
    //                 job_name: 'GIVEN JOB NAME FROM BACKEND',
    //                 children: [
    //                     {
    //                         name: 'Application of desensitizing medicament',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Application of desensitizing resin for cervical and/or root surface, per tooth',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Behavior management, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Treatment of complications (post-surgical) ? unusual circumstances, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Occlusal guard, by report',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Fabrication of athletic mouthguard',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Repair and/or reline of occlusal guard',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Occlusion analysis ? mounted case',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Occlusal adjustment ? limited',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Occlusal adjustment ? complete',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Enamel microabrasion',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'Odontoplasty 1-2 teeth; includes removal of enamel projections',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'External bleaching ? per arch ? performed in office',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                     {
    //                         name: 'External bleaching ? per tooth ( CDT 2013)',
    //                         job_name: 'GIVEN JOB NAME FROM BACKEND'
    //                     },
    //                 ]
    //             },
    //         ]
    //     },
    // ];

    @Input() DiagnosisData: any = '';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();

    private _transformer = (node: any, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            category: node.category,
            // job_name: node.job_name,
            level: level,
        };
    };

    treeControl = new FlatTreeControl<any>(
        node => node.level,
        node => node.expandable,
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
    );
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor() { }

    ngOnInit(): void {
        // this.dataSource.data = this.TREE_DATA;
        this.dataSource.data = this.DiagnosisData;
        console.log('> DiagnosisData ---> ', this.DiagnosisData);
    }

    hasChild = (_: number, node: any) => node.expandable;

    setJobNames(job_name) {
        console.log('> setJobNames ---> ', job_name);
        this.callBackEvent.emit({
            job_name: job_name,
        });
    }

};
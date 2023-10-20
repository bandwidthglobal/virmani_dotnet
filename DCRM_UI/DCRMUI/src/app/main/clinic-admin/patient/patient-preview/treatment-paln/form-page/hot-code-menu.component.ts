import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource } from "@angular/material/tree";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-hot-code-menu',
    templateUrl: './hot-code-menu.component.html',
    styleUrls: ['./hot-code-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // imports: [MatIconModule]
})

export class HotCodeMenuComponent implements OnInit {

    TREE_DATA: any = [
        {
            name: 'Diagnostic',
            children: [
                {
                    name: 'Clinical Oral Evaluations',
                    children: [
                        { name: 'Periodic oral evaluation' },
                        { name: 'Limited Oral Evaluation Problem Focused' },
                        { name: 'Comprehensive Oral Evaluation – New Or Established Patient' },
                        { name: 'Comprehensive Periodontal Evaluation – New Or Established Patient' }
                    ]
                }
            ],
        },
        {
            name: 'Preventive',
            children: [
                { name: 'Prophylaxis' },
                { name: 'Topical application of fluoride' },
                { name: 'Nutritional counseling for control of dental disease' },
                { name: 'Tobacco counseling' },
                { name: 'Oral hygiene instructions' },
                { name: 'Sealant' },
                { name: 'Space maintainer' },
                { name: 'Re-cementation of space maintainer' },
            ]
        },
        {
            name: 'Restorative',
            children: [
                {
                    name: 'Amalgam Restorations',
                    children: [
                        { name: 'One surface' },
                        { name: 'Two surface' },
                        { name: 'Three surface' },
                        { name: 'Four surface or more' },
                    ]
                },
                {
                    name: 'Composite Restorations – Direct',
                    children: [
                        {
                            name: 'Anterior',
                            children: [
                                { name: 'One surface' },
                                { name: 'Two surface' },
                                { name: 'Three surface' },
                                { name: 'Four or more surfaces' },
                                { name: 'Crown composite' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Composite Restorations – Direct',
                    children: [
                        {
                            name: 'Posterior',
                            children: [
                                { name: 'One surface' },
                                { name: 'Two surface' },
                                { name: 'Three surface' },
                                { name: 'Four or more surfaces' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Inlay/Onlay Restorations',
                    children: [
                        {
                            name: 'Inlay -Metallic',
                            children: [
                                { name: 'One surface' },
                                { name: 'Two surface' },
                                { name: 'Three Or More Surface' },
                            ]
                        },
                        {
                            name: 'Onlay – Metallic',
                            children: [
                                { name: 'Two surface' },
                                { name: 'Three surface' },
                                { name: 'Four Or More Surface' },
                            ]
                        },
                        {
                            name: 'Inlay - Ceramic',
                            children: [
                                { name: 'One surface' },
                                { name: 'Two surface' },
                                { name: 'Three Or More Surface' },
                            ]
                        },
                        {
                            name: 'Onlay - Ceramic',
                            children: [
                                { name: 'Two surface' },
                                { name: 'Three surface' },
                                { name: 'Four Or More Surface' },
                            ]
                        },
                        {
                            name: 'Inlay - Composite',
                            children: [
                                { name: 'One surface' },
                                { name: 'Two surface' },
                                { name: 'Three Or More Surface' },
                            ]
                        },
                        {
                            name: 'Onlay - Composite',
                            children: [
                                { name: 'Two surface' },
                                { name: 'Three surface' },
                                { name: 'Four Or More Surface' },
                            ]
                        },
                        {
                            name: 'Resin',
                            children: [
                                { name: 'Resin-based composite (indirect' },
                                { name: 'Resin on metal' },
                                { name: 'Provisional crown' },
                            ]
                        },
                        {
                            name: 'Porcelin',
                            children: [
                                { name: 'Porcelain -> Porcelain on ceramic substrate (e.g.Emax layer)' },
                                { name: 'Porcelain fused to  base metal' },
                                { name: 'Porcelain fused to noble metal' },
                            ]
                        },
                        {
                            name: 'Metal',
                            children: [
                                { name: 'Full cast  base metal' },
                                { name: 'Full cast high noble metal' },
                                { name: 'Titanium' },
                            ]
                        },
                        {
                            name: 'Primary Tooth',
                            children: [
                                { name: 'Primary tooth porcelain/ceramic Prefabricated  crown' },
                                { name: 'Primary tooth  stainless steel Prefabricated crown' },
                            ]
                        },
                    ]
                },
                { name: 'Crowns - Single', },
                {
                    name: 'Other Restorative Services',
                    children: [
                        { name: 'Recement inlay, onlay' },
                        { name: 'Recement crown' },
                        { name: 'Core buildup, including any pins' },
                        { name: 'Post removal' },
                        { name: 'Labial veneer (resin laminate) – chairside' },
                        { name: 'Labial veneer (resin laminate) – laboratory' },
                        { name: 'Labial veneer (porcelain laminate) – laboratory' },
                        { name: 'Veneer repair necessitated by restorative material failure' },
                        { name: 'Unspecified restorative procedure, by report' },
                    ]
                },
            ]
        },
        {
            name: 'Endodontics',
            children: [
                {
                    name: 'Pulp Capping',
                    children: [
                        { name: 'Pulp cap ? direct (excluding final restoration)' },
                        { name: 'Pulp cap ? indirect (excluding final restoration)' }
                    ]
                },
                {
                    name: 'Pulpotomy',
                    children: [
                        { name: 'Pulpotomy -removal of pulp coronal to the dentinocemental Junction' },
                        { name: 'Partial pulpotomy for apexogenesis ? permanent tooth with incomplete root development' }
                    ]
                },
                {
                    name: 'Endodontic Therapy',
                    children: [
                        {
                            name: 'Primary Teeth',
                            children: [
                                { name: 'Primary Teeth -> Pulpal therapy (resorbable filling) ? anterior, primary tooth' },
                                { name: 'Primary Teeth -> Pulpal therapy (resorbable filling) ? posterior, primary tooth' }
                            ]
                        },
                        {
                            name: 'Permanent Teeth',
                            children: [
                                { name: 'Anterior tooth' },
                                { name: 'Bicuspid tooth' },
                                { name: 'Molar' },
                                { name: 'Permanent Teeth -> Treatment of root canal obstruction; non-surgical access' },
                                { name: 'Incomplete endodontic therapy; inoperable, unrestorable or fractured tooth' },
                                { name: 'Internal root repair of perforation defects' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Endodontic Retreatment',
                    children: [
                        {
                            name: 'Apexification/recalcification/pulpal regeneration',
                            children: [
                                { name: 'Initial visit (apical closure/calcific repair of perforations, root resorption, pulp space disinfection, etc.)' },
                                { name: 'Interim medication replacement' },
                                { name: 'Final visit (includes completed root canal therapy ? apical closure/calcific repair of perforations, root resorption, etc.)' },
                            ]
                        },
                        {
                            name: 'Pulpal regeneration',
                            children: [
                                { name: 'Completion of regenerative treatment in an immature permanent tooth with a necrotic pulp' },
                            ]
                        },
                        { name: 'Anterior' },
                        { name: 'Bicuspid' },
                        { name: 'Molar' },
                    ]
                },
                {
                    name: 'Apicoectomy/Periradicular Services',
                    children: [
                        { name: 'Anterior' },
                        { name: 'Bicuspid' },
                        { name: 'Molar' },
                    ]
                },
                {
                    name: 'Reimplant',
                    children: [
                        { name: 'Intentional reimplantation (including necessary splinting)' },
                    ]
                },
                {
                    name: 'Other Endodontic Procedures',
                    children: [
                        { name: 'Unspecified endodontic procedure, by report' },
                    ]
                }
            ]
        },
        {
            name: 'Periodontics',
            children: [
                {
                    name: 'Surgical Services',
                    children: [
                        {
                            name: 'Gingivectomy or Gingivoplasty',
                            children: [
                                { name: 'Four or more contiguous teeth or tooth bounded spaces per quadrant' },
                                { name: 'One to three contiguous teeth or tooth bounded spaces per quadrant' },
                                { name: 'To allow access for restorative procedure, per tooth' },
                            ]
                        },
                        {
                            name: 'Anatomical crown exposure',
                            children: [
                                { name: 'Four or more contiguous teeth per quadrant' },
                                { name: 'One to three teeth per quadrant' },
                            ]
                        },
                        {
                            name: 'Flap procedure, including root planing',
                            children: [
                                { name: 'Four or more contiguous teeth or tooth bounded spaces per quadrant' },
                                { name: 'One to three contiguous teeth or tooth bounded spaces per quadrant' },
                                { name: 'Apically positioned flap' },
                                { name: 'Clinical crown lengthening ? hard tissue' },
                            ]
                        },
                        {
                            name: 'Osseous surgery',
                            children: [
                                { name: 'Four or more contiguous teeth or tooth bounded spaces per quadrant' },
                                { name: 'One to three contiguous teeth or tooth bounded spaces per quadrant' },
                                { name: 'Bone replacement graft' },
                            ]
                        },
                        {
                            name: 'Guided tissue regeneration',
                            children: [
                                { name: 'Resorbable barrier' },
                                { name: 'Nonresorbable barrier' },
                            ]
                        },
                        {
                            name: 'Pedicle soft tissue graft procedure',
                        },
                        {
                            name: 'Pedicle soft tissue graft procedure',
                        },
                        {
                            name: 'Soft tissue allograft',
                        },
                    ]
                },
                {
                    name: 'Non-Surgical Periodontal Service',
                    children: [
                        {
                            name: 'Provisional splinting',
                            children: [
                                { name: 'Intracoronal' },
                                { name: 'Extracoronal' },
                            ]
                        },
                        {
                            name: 'Periodontal scaling and root planing',
                            children: [
                                { name: 'Four or more teeth per quadrant' },
                                { name: 'One to three teeth per quadrant' },
                            ]
                        },
                        {
                            name: 'Other Periodontal Services',
                            children: [
                                { name: 'Unspecified periodontal procedure, by report' },
                            ]
                        },
                    ]
                }
            ]
        },
        {
            name: 'Prosthodontics (removable)',
            children: [
                {
                    name: 'Complete Dentures (Including Routine Post-Delivery Care)',
                    children: [
                        {
                            name: 'Complete Denture',
                            children: [
                                { name: 'Maxillary' },
                                { name: 'Mandibular' },
                            ]
                        },
                        {
                            name: 'Immediate Complete Denture',
                            children: [
                                { name: 'Maxillary' },
                                { name: 'Mandibular' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Partial Dentures (Including Routine Post-delivery Care)',
                    children: [
                        {
                            name: 'Resin Base',
                            children: [
                                { name: 'Maxillary' },
                                { name: 'Mandibular' },
                            ]
                        },
                        {
                            name: 'Cast Metal Framework With Resin',
                            children: [
                                { name: 'Maxillary' },
                                { name: 'Mandibular' },
                            ]
                        },
                        {
                            name: 'Flexible Base',
                            children: [
                                { name: 'Maxillary' },
                                { name: 'Mandibular' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Adjustments to Dentures',
                    children: [
                        {
                            name: 'Complete Denture',
                            children: [
                                { name: 'Maxillary' },
                                { name: 'Mandibular' },
                            ]
                        },
                        {
                            name: 'Partial Denture',
                            children: [
                                { name: 'Maxillary' },
                                { name: 'Mandibular' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Repairs',
                    children: [
                        {
                            name: 'Complete Dentures',
                            children: [
                                { name: 'Repair Broken Complete Denture Base' },
                                { name: 'Replace Missing Or Broken Teeth' },
                            ]
                        },
                        {
                            name: 'Partial Dentures',
                            children: [
                                { name: 'Resin Denture Base' },
                                { name: 'Cast Framework' },
                                { name: 'Broken Clasp' },
                                { name: 'Replace Broken Teeth' },
                                { name: 'Add Tooth To Existing Partial Denture' },
                                { name: 'Add Clasp To Existing Partial Denture' },
                                { name: 'Replace All Teeth And Acrylic On Cast Metal Framework (Maxillary)' },
                                { name: 'Replace All Teeth And Acrylic On Cast Metal Framework (Mandibular)' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Denture Rebase Procedures',
                    children: [
                        {
                            name: 'Ccomplete',
                            children: [
                                { name: 'Maxillary Denture' },
                                { name: 'Mandibular Denture' },
                            ]
                        },
                        {
                            name: 'Partial Denture',
                            children: [
                                { name: 'Maxillary Partial Denture' },
                                { name: 'Mandibular Partial Denture' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Denture Reline Procedures',
                    children: [
                        {
                            name: 'Complete Denture',
                            children: [
                                { name: 'Maxillary Complete Chairside' },
                                { name: 'Mandibular Complete Chairside' },
                                { name: 'Maxillary Complete Laboratory' },
                                { name: 'Mandibular Complete Laboratory' },
                            ]
                        },
                        {
                            name: 'Partial Denture',
                            children: [
                                { name: 'Maxillary Partial Chairside' },
                                { name: 'Mandibular Partial Chairside' },
                                { name: 'Maxillary Partial Laboratory' },
                                { name: 'Mandibular Partial Laboratory' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Interim Prosthesis',
                    children: [
                        {
                            name: 'Complete Denture',
                            children: [
                                { name: 'Interim Complete Denture (Maxillary)' },
                                { name: 'Interim Complete Denture (Mandibular)' },
                            ]
                        },
                        {
                            name: 'Partial Denture',
                            children: [
                                { name: 'Interim Partial Denture (Maxillary)' },
                                { name: 'Interim Partial Denture (Mandibular)' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Other Removable Prosthetic Services',
                    children: [
                        { name: 'Tissue Conditioning, Maxillary' },
                        { name: 'Tissue Conditioning, Mandibular' },
                        { name: 'Overdenture ? Complete, By Report' },
                        { name: 'Overdenture ? Partial, By Report' },
                        { name: 'Precision Attachment, By Report' },
                        { name: 'Unspecified Removable Prosthodontic Procedure, By Report' },
                    ]
                },
            ]
        },
        {
            name: 'Maxillofacial Prosthetics',
            children: [
                { name: 'Facial Moulage (Sectional)' },
                { name: 'Facial Moulage (Complete)' },
                { name: 'Nasal Prosthesis' },
                { name: 'Auricular Prosthesis' },
                { name: 'Orbital Prosthesis' },
                { name: 'Ocular Prosthesis' },
                { name: 'Facial Prosthesis' },
                { name: 'Nasal Septal Prosthesis' },
                { name: 'Ocular Prosthesis, Interim' },
                { name: 'Cranial Prosthesis' },
                { name: 'Facial Augmentation Implant Prosthesis' },
                { name: 'Nasal Pros Thesis, Replacement' },
                { name: 'Auricular Prosthesis, Replacement' },
                { name: 'Orbital Prosthesis, Replacement' },
                { name: 'Facial Prosthesis, Replacement' },
                { name: 'Obturator Prosthesis, Surgical' },
                { name: 'Obturator Prosthesis, Definitive' },
                { name: 'Obturator Prosthesis, Modification' },
                { name: 'Mandibular Resection Prosthesis With Guide Flange' },
                { name: 'Mandibular Resection Prosthesis Without Guide Flange' },
                { name: 'Obturator Prosthesis, Interim' },
                { name: 'Trismus Appliance (Not For TMD Treatment)' },
                { name: 'Feeding Aid' },
                { name: 'Speech Aid Prosthesis, Pediatric' },
                { name: 'Speech aid Prosthesis, Adult' },
                { name: 'Palatal Augmentation Prosthesis' },
                { name: 'Palatal Lift Prosthesis, Definitive' },
                { name: 'Palatal Lift Prosthesis, Interim' },
                { name: 'Palatal Lift Prosthesis, Modification' },
                { name: 'Speech Aid Prosthesis, Modification' },
                { name: 'Surgical Stent' },
                { name: 'Radiation Carrier' },
                { name: 'Radiation Shield' },
                { name: 'Radiation Conelocator' },
                { name: 'Fluoride Gel Carrier' },
                { name: 'Commissure Splint' },
                { name: 'Surgical Splint' },
                { name: 'Topical Medicament Carrier' },
                { name: '>Adjust Maxillofacial Prosthetic Appliance, By Report' },
                { name: 'Maintenance And Cleaning Of A Maxillofacial Prosthesis By Report' },
                { name: 'Unspecified Maxillofacial Prosthesis, By Report' },
            ]
        },
        {
            name: 'Implant Services',
            children: [
                {
                    name: 'Pre-Surgical Services',
                    children: [
                        { name: 'Radiographic/Surgical Implant Index, By Report' },
                    ]
                },
                {
                    name: 'Surgical Services',
                    children: [
                        { name: 'Surgical Placement Of Implant Body: Endosteal Implant' },
                        { name: 'Placement Of Interim Implant Body For Transitional Prosthesis' },
                        { name: 'Implant Removal, By Report' },
                        { name: 'Debridement Of S Periimplant Defect And Surface Cleaning Of Exposed Implant Surfaces,' },
                        { name: 'Debridement Of Osseous Contouring Of A Periimplant Defect' },
                        { name: 'Bone Graft For Repair Of Periimplant Defect Placement Of A Barrier Membrane Or Biologic Materials To Aid In Osseous Regeneration' },
                        { name: 'Bone Graft At Time Of Implant Placement' },
                        { name: 'Interim Abutment' },
                        { name: 'Connecting Bar ? Implant Supported Or Abutment Supported' },
                        { name: 'Prefabricated Abutment ? Includes Modification And Placement' },
                        { name: 'Custom Abutment ? Includes Placement Implant/Abutment Supported Removable Dentures' },
                        { name: 'Implant/Abutment Supported Removable Denture For Completely Edentulous Arch' },
                        { name: 'Implant/Abutment Supported Removable Denture For Partially Edentulous Arch Implant /Abutment Supported Fixed Dentures (Hybrid Prosthesis)' },
                        { name: 'Implant/Abutment Supported Fixed Denture For Completely Edentulous Arch' },
                        { name: 'Implant/Abutment Supported Fixed Denture For Partially Edentulous Arch, Single Crowns, Abutment Supported' },
                        { name: 'Abutment Supported Porcelain/Ceramic Crown' },
                        { name: 'Abutment Supported Porcelain Fused To Metal Crown (High Noble Metal)' },
                        { name: 'Abutment Supported Porcelain Fused To Metal Crown (Predominantly Base Metal)' },
                        { name: 'Abutment Supported Porcelain Fused To Metal Crown (Noble Metal)' },
                        { name: 'Abutment Supported Cast Metal Crown (High Noble Metal)' },
                        { name: 'Abutment Supported Cast Metal Crown (Predominantly Base Metal)' },
                        { name: 'Abutment Supported Cast Metal Crown (Noble Metal)' },
                        { name: 'Abutment Supported Crown ? (Titanium)' },
                        { name: 'Implant Supported Porcelain/Ceramic Crown' },
                        { name: 'Implant Supported Porcelain Fused To Metal Crown (Titanium, Titanium Alloy, High Noble Metal)' },
                        { name: 'Implant Supported Metal Crown (Titanium, Titanium Alloy, High Noble Metal)' },
                    ]
                },
                {
                    name: 'Fixed Partial Denture, Abutment Supported',
                    children: [
                        { name: 'Abutment Supported Retainer For Porcelain/Ceramic FPD' },
                        { name: 'Abutment Supported Retainer For Porcelain Fused To Metal FPD (High Noble Metal)' },
                        { name: 'Abutment Supported Retainer For Porcelain Fused To Metal FPD (Predominantly Base Metal)' },
                        { name: 'Abutment Supported Retainer For Porcelain Fused To Metal FPD (Noble Metal)' },
                        { name: 'Abutment Supported Retainer For Cast Metal FPD (High Noble Metal)' },
                        { name: 'Abutment Supported Retainer For Cast Metal FPD (Predominantly Base Metal)' },
                        { name: 'Abutment Supported Retainer For Cast Metal FPD (Noble Metal)' },
                        { name: 'Abutment Supported Retainer Crown For FPD ? (Titanium)' },
                    ]
                },
                {
                    name: 'Fixed Partial Denture, Implant Supported',
                    children: [
                        { name: 'Implant Supported Retainer For Ceramic FPD' },
                        { name: 'Implant Supported Retainer For Porcelain Fused To Metal FPD ' },
                        { name: 'Implant Supported Retainer For Cast Metal FPD ' },
                        { name: 'Implant maintenance procedures, Including Removal Of Prosthesis, Cleansing Abutments And Reinsertion ' },
                        { name: 'Repair Implant Supported Prosthesis, By Report' },
                        { name: 'Repair Implant Abutment, By Report' },
                        { name: 'Replacement Of Semi-precision Or Precision Attachment ' },
                        { name: 'Recement Implant/Abutment Supported Crown' },
                        { name: 'Recement Implant/Abutment Supported Fixed Partial Denture' },
                        { name: 'Unspecified Implant procedure, By Report' },
                    ]
                },
            ]
        },
        {
            name: 'Prosthodontics, fixed',
            children: [
                {
                    name: 'Fixed Partial Denture Retainers ? Inlays/Onlays',
                    children: [
                        {
                            name: 'Retainer',
                            children: [
                                { name: 'Retainer ? Cast Metal For Resin Bonded Fixed Prosthesis' },
                                { name: 'Retainer ? porcelain/ceramic For Resin Bonded Fixed Prosthesis' },
                            ]
                        },
                        {
                            name: 'Inlay',
                            children: [
                                { name: 'Inlay ? Porcelain/Ceramic, Two Surfaces' },
                                { name: 'Inlay ? Porcelain/Ceramic, Three Or More Surfaces' },
                                { name: 'Inlay ? Cast High Noble Metal, Two Surfaces' },
                                { name: 'Inlay ? Cast High Noble Metal, Three Or More Surfaces' },
                                { name: 'Inlay ? Cast predominantly Base Metal, Two Surfaces' },
                                { name: 'Inlay ? Cast predominantly Base Metal, Three Or More Surfaces' },
                                { name: 'Inlay ? Cast noble Metal, Two Surfaces' },
                                { name: 'Inlay ? Cast noble Metal, Three Or More Surfaces' },
                                { name: 'Inlay ? Titanium' },
                            ]
                        },
                        {
                            name: 'Onlay',
                            children: [
                                { name: 'Onlay ? Porcelain/Ceramic, Two Surfaces' },
                                { name: 'Onlay ? Porcelain/Ceramic, Three Or More Surfaces' },
                                { name: 'Onlay ? Cast High Noble Metal, Two Surfaces' },
                                { name: 'Onlay ? Cast High Noble Metal, Three Or More Surfaces' },
                                { name: 'Onlay ? Cast predominantly Base Metal, Two Surfaces' },
                                { name: 'Onlay ? Cast predominantly Base Metal, Three Or More Surfaces' },
                                { name: 'Onlay ? Cast noble Metal, Two Surfaces' },
                                { name: 'Onlay ? Cast noble Metal, Three Or More Surfaces' },
                                { name: 'Onlay ? Titanium' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Fixed Partial Denture Retainers ? Crowns',
                    children: [
                        {
                            name: 'Crowns',
                            children: [
                                { name: 'Crown ? Indirect Resin Based Composite' },
                                { name: 'Crown ? Resin with High Noble Metal' },
                                { name: 'Crown ? Resin with Predominantly Base Metal' },
                                { name: 'Crown ? Resin with Noble Metal' },
                                { name: 'Crown ? Porcelain/Ceramic' },
                                { name: 'Crown ? Porcelain Fused To High Noble Metal' },
                                { name: 'Crown ? Porcelain Fused To predominantly Base Metal' },
                                { name: 'Crown ? Porcelain Fused To Noble Metal' },
                                { name: 'Crown ? 3?4 Cast High Noble Metal' },
                                { name: 'Crown ? 3?4 Cast Predominantly Base Metal' },
                                { name: 'Crown ? 3?4 Cast Noble Metal' },
                                { name: 'Crown ? 3?4 Porcelain/Ceramic' },
                                { name: 'Crown ? full Cast High Noble Metal' },
                                { name: 'Crown ? full Cast Predominantly base Metal' },
                                { name: 'Crown ? full Cast Noble Metal' },
                                { name: 'Provisional Retainer Crown ? Prior To Final Impression' },
                                { name: 'Crown ? Titanium' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Other Fixed Partial Denture Services',
                    children: [
                        { name: 'Connector Bar' },
                        { name: 'Recement Fixed Partial Denture' },
                        { name: 'Stress Breaker' },
                        { name: 'Precision Attachment' },
                        { name: 'Coping' },
                        { name: 'Fixed Partial Denture Repair Necessitated By Restorative Material Failure' },
                        { name: 'Pediatric Partial Denture, Fixed' },
                        { name: 'Unspecified Fixed Prosthodontic Procedure, By Report' },
                    ]
                },
            ]
        },
        {
            name: 'Oral and Maxillofacial Surgery',
            children: [
                {
                    name: 'Extractions (Includes local anesthesia, suturing, if needed, and routine postoperative care)',
                    children: [
                        { NAME: 'Extraction, coronal remnants ? deciduous tooth' },
                        { NAME: 'Extraction, erupted tooth or exposed root (elevation and/or forceps removal)' },
                        { NAME: 'Surgical removal of erupted tooth requiring removal of bone and/or sectioning of tooth, and including  elevation of mucoperiosteal flap if indicated' },
                        { NAME: 'Removal of impacted tooth ? soft tissue' },
                        { NAME: 'Removal of impacted tooth ? partially bony' },
                        { NAME: 'Removal of impacted tooth ? completely bony' },
                        { NAME: 'Removal of impacted tooth ? completely bony, with unusual surgical complications' },
                        { NAME: 'Surgical removal of residual tooth roots (cutting procedure)' },
                        { NAME: 'Coronectomy ? intentional partial tooth removal' },
                    ]
                },
                {
                    name: 'Other Surgical Procedures',
                    children: [
                        { name: 'Oroantral fistula closure' },
                        { name: 'Primary closure of a sinus perforation' },
                        { name: 'Tooth reimplantation and/or stabilization of accidentally evulsed or displaced tooth' },
                        { name: 'Tooth transplantation (includes reimplantation from one site to another and splinting and/or stabilization)' },
                        { name: 'Surgical access of an unerupted tooth' },
                        { name: 'Mobilization of erupted or malpositioned tooth to aid eruption' },
                        { name: 'Placement of device to facilitate eruption of impacted tooth' },
                        { name: 'Biopsy of oral tissue ? hard (bone, tooth)' },
                        { name: 'Biopsy of oral tissue ? soft' },
                        { name: 'Exfoliative cytological sample collection' },
                        { name: 'Brush biopsy ? transepithelial sample collection' },
                        { name: 'Surgical repositioning of teeth' },
                        { name: 'Transseptal fiberotomy/supra crestal fiberotomy, by report' },
                        { name: 'Surgical placement: temporary anchorage device [screw retained plate] requiring surgical flap' },
                        { name: 'Surgical placement: temporary anchorage device requiring surgical flap' },
                        { name: 'Surgical placement: temporary anchorage device without surgical flap' },
                        { name: 'Harvest of bone fur use in autogenous grafting procedure' },
                    ]
                },
                {
                    name: 'Alveoloplasty ? Surgical Preparation of Ridge for Dentures',
                    children: [
                        { name: 'Alveoloplasty in conjunction with extractions ? four or more teeth or tooth spaces, per quadrant' },
                        { name: 'Alveoloplasty in conjunction with extractions ? one to three teeth or tooth spaces, per quadrant' },
                        { name: 'Alveoloplasty not in conjunction with extractions ? four or more teeth or tooth spaces, per quadrant' },
                        { name: 'Alveoloplasty not in conjunction with extractions ? one to three teeth or tooth spaces, per quadrant' },
                    ]
                },
                {
                    name: 'Vestibuloplasty',
                    children: [
                        { name: 'Vestibuloplasty ? ridge extension (secondary epithelialization)' },
                        { name: 'Vestibuloplasty ? ridge extension (including soft tissue grafts, muscle reattachment, revision of soft tissue attachment and management of hypertrophied and hyperplastic tissue) Includes non-odontogenic cysts' },
                    ]
                },
                {
                    name: 'Excision of  Soft tissue lesion',
                    children: [
                        { name: 'Excision of benign lesion up to 1.25 cm' },
                        { name: 'Excision of benign lesion greater than 1.25 cm' },
                        { name: 'Excision of benign lesion, complicated' },
                        { name: 'Excision of malignant lesion up to 1.25 cm CDT 2013' },
                        { name: 'Excision of malignant lesion greater than 1.25 cm' },
                        { name: 'Excision of malignant lesion, complicated' },
                        { name: 'Destruction of lesion(s) by physical or chemical method, by report' },
                    ]
                },
                {
                    name: 'Surgical Excision of Intra-Osseous Lesions',
                    children: [
                        { name: 'Excision of malignant tumor ? lesion diameter up to 1.25 cm' },
                        { name: 'Excision of malignant tumor ? lesion diameter greater than 1.25 cm' },
                        { name: 'Removal of benign odontogenic cyst or tumor ? lesion diameter up to 1.25 cm' },
                        { name: 'Removal of benign odontogenic cyst or tumor ? lesion diameter greater than 1.25 cm' },
                        { name: 'Removal of benign nonodontogenic cyst or tumor ? lesion diameter up to 1.25 cm' },
                        { name: 'Removal of benign nonodontogenic cyst or tumor ? lesion diameter greater than 1.25 cm' },
                        { name: 'Removal of lateral exostosis (maxilla or mandible)' },
                        { name: 'Removal of torus palatinus' },
                        { name: 'Removal of torus mandibularis' },
                        { name: 'Surgical reduction of osseous tuberosity' },
                        { name: 'Radical resection of maxilla or mandible' },
                    ]
                },
                {
                    name: 'Surgical Incision',
                    children: [
                        { name: 'Incision and drainage of abscess ? intraoral soft tissue' },
                        { name: 'Incision and drainage of abscess ? intraoral soft tissue ? complicated (includes drainage of multiple fascial spaces)' },
                        { name: 'Incision and drainage of abscess ? extraoral soft tissue' },
                        { name: 'Incision and drainage of abscess ? extraoral soft tissue ? complicated (includes drainage of multiple fascial spaces)' },
                        { name: 'Removal of foreign body from mucosa, skin, or subcutaneous alveolar tissue' },
                        { name: 'Removal of reaction producing foreign bodies, musculoskeletal system' },
                        { name: 'Partial ostectomy/sequestrectomy for removal of non-vital bone' },
                        { name: 'Maxillary sinusotomy for removal of tooth fragment or foreign body' },
                    ]
                },
                {
                    name: 'Treatment of Fractures',
                    children: [
                        {
                            name: 'Simple',
                            children: [
                                { name: 'Maxilla ? open reduction (teeth immobilized, if present)' },
                                { name: 'Maxilla ? closed reduction (teeth immobilized, if present)' },
                                { name: 'Mandible ? open reduction (teeth immobilized, if present)' },
                                { name: 'Mandible ? closed reduction (teeth immobilized, if present)' },
                                { name: 'Malar and/or zygomatic arch ? open reduction' },
                                { name: 'Malar and/or zygomatic arch ? closed reduction' },
                                { name: 'Alveolus ? closed reduction, may include stabilization of teeth' },
                                { name: 'Alveolus ? open reduction, may include stabilization of teeth' },
                                { name: 'Facial bones ? complicated reduction with fixation and multiple surgical approaches' },
                            ]
                        },
                        {
                            name: 'Compound',
                            children: [
                                { name: 'Maxilla ? open reduction' },
                                { name: 'Maxilla ? closed reduction' },
                                { name: 'Mandible ? open reduction' },
                                { name: 'Mandible ? closed reduction' },
                                { name: 'Malar and/or zygomatic arch ? open reduction' },
                                { name: 'Malar and/or zygomatic arch ? closed reduction' },
                                { name: 'Alveolus ? open reduction stabilization of teeth' },
                                { name: 'Alveolus, closed reduction stabilization of teeth CDT 2013' },
                                { name: 'Facial bones ? complicated reduction with fixation and multiple surgical approaches' },
                            ]
                        },
                    ]
                },
                {
                    name: 'Reduction of Dislocation and Management of Other Temporomandibular Joint Dysfunctions',
                    children: [
                        { name: 'Open reduction of dislocation' },
                        { name: 'Closed reduction of dislocation' },
                        { name: 'Manipulation under anesthesia' },
                        { name: 'Condylectomy' },
                        { name: 'Surgical discectomy, with/without implant' },
                        { name: 'Disc repair' },
                        { name: 'Synovectomy' },
                        { name: 'Myotomy' },
                        { name: 'Joint reconstruction' },
                        { name: 'Arthrotomy' },
                        { name: 'Arthroplasty' },
                        { name: 'Arthrocentesis' },
                        { name: 'Non-arthroscopic lysis and lavage' },
                        { name: 'Arthroscopy ? diagnosis, with or without biopsy' },
                        { name: 'Arthroscopy ? surgical: lavage and lysis of adhesions' },
                        { name: 'Arthroscopy ? surgical: disc repositioning and stabilization' },
                        { name: 'Arthroscopy ? surgical: synovectomy' },
                        { name: 'Arthroscopy ? surgical: discectomy' },
                        { name: 'Arthroscopy ? surgical: debridement' },
                        { name: 'Occlusal orthotic device, by report' },
                        { name: 'Unspecified TMD therapy, by report' },
                    ]
                },
                {
                    name: 'Repair of Traumatic Wounds',
                    children: [
                        { name: 'Suture of recent small wounds up to 5 cm' },
                        { name: 'Complicated suture ? up to 5 cm' },
                        { name: 'Complicated suture ? greater than 5 c"m' },
                    ]
                },
                {
                    name: 'Other Repair Procedures',
                    children: [
                        { name: 'Skin graft (identify defect covered, location and type of graft)' },
                        { name: 'Collection and application of autologous blood concentrate product' },
                        { name: 'Osteoplasty ? for orthognathic deformities' },
                        { name: 'Osteotomy ? mandibular rami' },
                        { name: 'Osteotomy ? mandibular rami with bone graft; includes obtaining the graft' },
                        { name: 'Osteotomy ? segmented or subapical' },
                        { name: 'Osteotomy ? body of mandible' },
                        { name: 'LeFort I (maxilla ? total)' },
                        { name: 'LeFort I (maxilla ? segmented)' },
                        { name: 'LeFort II or LeFort III (osteoplasty of facial bones for midface hypoplasia or retrusion)-without bone graft' },
                        { name: 'LeFort II or LeFort III ? with bone graft' },
                        { name: 'Osseous, osteoperiosteal, or cartilage graft of the mandible or maxilla ? autogenous or nonautogenous, by report' },
                        { name: 'Sinus augmentation with bone or bone substitutes via a lateral open approach' },
                        { name: 'Sinus augmentation via a vertical approach' },
                        { name: 'Bone replacement graft for ridge preservation ? per site' },
                        { name: 'Repair of maxillofacial soft and/or hard tissue defect CDT 2013' },
                        { name: 'Frenulectomy ? also known as frenectomy or frenotomy ? separate procedure not incidental to another procedure' },
                        { name: 'Frenuloplasty' },
                        { name: 'Excision of hyperplastic tissue ? per arch' },
                        { name: 'Excision of pericoronal gingiva' },
                        { name: 'Surgical reduction of fibrous tuberosity' },
                        { name: 'Sialolithotomy' },
                        { name: 'Excision of salivary gland, by report' },
                        { name: 'Sialodochoplasty' },
                        { name: 'Closure of salivary fistula' },
                        { name: 'Emergency tracheotomy' },
                        { name: 'Coronoidectomy' },
                        { name: 'Synthetic graft ? mandible or facial bones, by report' },
                        { name: 'Implant-mandible for augmentation purposes (excluding alveolar ridge), by report' },
                        { name: 'Appliance removal (not by dentist who placed appliance), includes removal of archbar' },
                        { name: 'Intraoral placement of a fixation device not in conjunction with a fracture' },
                        { name: 'Unspecified oral surgery procedure, by repor' },
                    ]
                },
            ]
        },
        {
            name: 'Orthodontics',
            children: [
                {
                    name: 'Limited Orthodontic Treatment',
                    children: [
                        { name: 'Limited orthodontic treatment of the primary dentition' },
                        { name: 'Limited orthodontic treatment of the transitional dentition' },
                        { name: 'Limited orthodontic treatment of the adolescent dentition' },
                        { name: 'Limited orthodontic treatment of the adult dentition' },
                    ]
                },
                {
                    name: 'Interceptive Orthodontic Treatment',
                    children: [
                        { name: 'Interceptive orthodontic treatment of the primary dentition' },
                        { name: 'Interceptive orthodontic treatment of the transitional dentition' },
                    ]
                },
                {
                    name: 'Comprehensive Orthodontic',
                    children: [
                        { name: 'Comprehensive orthodontic treatment of the transitional dentition' },
                        { name: 'Comprehensive orthodontic treatment of the adolescent dentition' },
                        { name: 'Comprehensive orthodontic treatment of the adult dentition' },
                    ]
                },
                {
                    name: 'Minor Treatment to Control Harmful Habits',
                    children: [
                        { name: 'Removable appliance therapy' },
                        { name: 'Fixed appliance therapy' },
                    ]
                },
                {
                    name: 'Other Orthodontic Services',
                    children: [
                        { name: 'Pre-orthodontic treatment visit' },
                        { name: 'Periodic orthodontic treatment visit (as part of contract)' },
                        { name: 'Orthodontic retention (removal of appliances, construction and placement of retainer(s))' },
                        { name: 'Orthodontic treatment (alternative billing to a contract fee)' },
                        { name: 'Repair of orthodontic appliance' },
                        { name: 'Replacement of lost or broken retainer' },
                        { name: 'Rebonding or recementing; and/or repair, as required, of fixed retainers' },
                        { name: 'Unspecified orthodontic procedure, by repor' },
                    ]
                },
            ]
        },
        {
            name: 'Adjunctive General Services',
            children: [
                {
                    name: 'Unclassified Treatment',
                    children: [
                        { name: 'Palliative (emergency) treatment of dental pain ? minor procedure' },
                        { name: 'Fixed partial denture sectioning' },
                    ]
                },
                {
                    name: 'Anesthesia',
                    children: [
                        { name: 'Local anesthesia not in conjunction with operative or surgical procedures' },
                        { name: 'Regional block anesthesia' },
                        { name: 'Trigeminal division block anesthesia' },
                        { name: 'Local anesthesia in conjunction with operative or surgical procedures' },
                        { name: 'Deep sedation/general anesthesia ? first 30 minutes' },
                        { name: 'Deep sedation/general anesthesia ? each additional 15 minutes' },
                        { name: 'Inhalation of nitrous oxide/anxiolysis, analgesia' },
                        { name: 'Intravenous conscious sedation/analgesia ? first 30 minutes' },
                        { name: 'Intravenous conscious sedation/analgesia ? each additional 15 minutes' },
                        { name: 'Non-intravenous conscious sedation' },
                    ]
                },
                {
                    name: 'Professional Consultation',
                    children: [
                        { name: 'Consultation ? diagnostic service provided by dentist or physician other than requesting dentist or physician Professional Visits' },
                        { name: 'House/extended care facility call' },
                        { name: 'hospital or ambulatory surgical center call' },
                        { name: 'Office visit for observation (during regularly scheduled hours) ? no other services performed' },
                        { name: 'Office visit ? after regularly scheduled hours' },
                        { name: 'Case presentation, detailed and extensive treatment planni' },
                    ]
                },
                {
                    name: 'Drugs',
                    children: [
                        { name: 'Therapeutic parenteral drug, single administration' },
                        { name: 'Therapeutic parenteral drugs, two or more administrations, different medications' },
                        { name: 'Other drugs and/or medicaments, by report' },
                    ]
                },
                {
                    name: 'Miscellaneous Services',
                    children: [
                        { name: 'Application of desensitizing medicament' },
                        { name: 'Application of desensitizing resin for cervical and/or root surface, per tooth' },
                        { name: 'Behavior management, by report' },
                        { name: 'Treatment of complications (post-surgical) ? unusual circumstances, by report' },
                        { name: 'Occlusal guard, by report' },
                        { name: 'Fabrication of athletic mouthguard' },
                        { name: 'Repair and/or reline of occlusal guard' },
                        { name: 'Occlusion analysis ? mounted case' },
                        { name: 'Occlusal adjustment ? limited' },
                        { name: 'Occlusal adjustment ? complete' },
                        { name: 'Enamel microabrasion' },
                        { name: 'Odontoplasty 1-2 teeth; includes removal of enamel projections' },
                        { name: 'External bleaching ? per arch ? performed in office' },
                        { name: 'External bleaching ? per tooth ( CDT 2013)' },
                    ]
                },
            ]
        },
    ];

    private _transformer = (node: any, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
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
        this.dataSource.data = this.TREE_DATA;
    }

    hasChild = (_: number, node: any) => node.expandable;

};
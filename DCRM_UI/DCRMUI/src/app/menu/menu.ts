import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [

    {
        id: 'apps',
        type: 'section',
        title: '',
        translate: 'MENU.APPS.SECTION',
        icon: 'home',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboard',
                translate: 'MENU.APPS.Dashboards',
                type: 'item',
                icon: 'home',
                url: 'admin/dashboard'
            },
            
            //{
            //    id: 'subscription',
            //    title: 'Subscription',
            //    translate: 'MENU.APPS.Subscription',
            //    type: 'item',
            //    icon: 'message-square',
            //    url: 'apps/subscription'
            //},
            //{
            //    id: 'registrations',
            //    title: 'Registrations',
            //    translate: 'MENU.APPS.Registrations',
            //    type: 'item',
            //    icon: 'check-square',
            //    url: 'apps/registrations'
            //},
            //{
            //    id: 'qrcode',
            //    title: 'qrcode',
            //    translate: 'MENU.APPS.QRCode',
            //    type: 'item',
            //    icon: 'calendar',
            //    url: 'apps/qrcode'
            //},
            //{
            //    id: 'ratingreviews',
            //    title: 'Rating Reviews',
            //    translate: 'MENU.APPS.RatingReviews',
            //    type: 'item',
            //    icon: 'calendar',
            //    url: 'apps/ratingreviews'
            //},
            //{
            //    id: 'departments',
            //    title: 'Departments',
            //    translate: 'MENU.APPS.Departments',
            //    type: 'item',
            //    icon: 'calendar',
            //    url: 'admin/departments'
            //},
            //{
            //    id: 'consultationcettings',
            //    title: 'ConsultationSettings',
            //    translate: 'MENU.APPS.ConsultationSettings',
            //    type: 'item',
            //    icon: 'calendar',
            //    url: 'admin/consultationcettings'
            //},
            //{
            //    id: 'consultations',
            //    title: 'Consultations',
            //    translate: 'MENU.APPS.Consultations',
            //    type: 'item',
            //    icon: 'calendar',
            //    url: 'admin/consultations'
            //},
            {
                id: 'staffs',
                title: 'Staff',
                translate: 'MENU.APPS.Staffs',
                type: 'item',
                icon: 'users',
                url: 'admin/staff/list',
                openInNewTab: true
            },
            {
                id: 'dealer',
                title: 'Dealer',
                translate: 'MENU.APPS.Dealer',
                type: 'item',
                icon: 'user-check',
                url: 'admin/dealer/list',
                openInNewTab: true
            },
            {
                id: 'doctors',
                title: 'Doctor',
                translate: 'MENU.APPS.Doctors',
                type: 'item',
                icon: 'user-plus',
                url: 'admin/doctor/list',
                openInNewTab: true
            },

            {
                id: 'settings',
                title: 'Settings',
                translate: 'MENU.APPS.SETTINGS.COLLAPSIBLE',
                type: 'collapsible',
                icon: 'settings',
                children: [
                    //{
                    //    id: 'clinicaldiagnosis',
                    //    title: 'Clinical Diagnosis',
                    //    translate: 'MENU.APPS.SETTINGS.ClinicalDiagnosis',
                    //    type: 'item',
                    //    icon: 'circle',
                    //    url: 'admin/dashboard4'
                    //},
                    //{
                    //    id: 'advise',
                    //    title: 'Advise',
                    //    translate: 'MENU.APPS.SETTINGS.Advise',
                    //    type: 'item',
                    //    icon: 'circle',
                    //    url: 'admin/dashboard5'
                    //},
                    {
                        id: 'diagnosistests',
                        title: 'Diagnosis Tests',
                        translate: 'MENU.APPS.SETTINGS.DiagnosisTests',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/settings/diagnosistests/list',
                        openInNewTab: true
                    },
                    {
                        id: 'prosthesistype',
                        title: 'Prosthesis Type',
                        translate: 'MENU.APPS.SETTINGS.ProsthesisType',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/settings/prosthesistype/list',
                        openInNewTab:true
                    }
                    ,
                    {
                        id: 'chairs',
                        title: 'Chairs',
                        translate: 'MENU.APPS.SETTINGS.Chairs',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/settings/chair/list',
                        openInNewTab:true
                    }
                    ,
                    {
                        id: 'masterdata',
                        title: 'Master Data',
                        translate: 'MENU.APPS.SETTINGS.MasterData',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/settings/masterdata/list',
                        openInNewTab:true
                    }
                ]
            },


            {
                id: 'Prescription',
                title: 'Prescription',
                translate: 'MENU.APPS.PRESCRIPTION.COLLAPSIBLE',
                type: 'collapsible',
                icon: 'file-text',
                children: [
                    {
                        id: 'createnew',
                        title: 'Create New',
                        translate: 'MENU.APPS.PRESCRIPTION.CreateNew',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/prescription/add',
                        openInNewTab: true
                    },
                    {
                        id: 'prescriptions',
                        title: 'Prescriptions',
                        translate: 'MENU.APPS.PRESCRIPTION.Prescriptions',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/prescription/list',
                        openInNewTab: true
                    },
                ]
            },

            {
                id: 'patients',
                title: 'Patients',
                translate: 'MENU.APPS.Patients',
                type: 'item',
                icon: 'user-x',
                url: 'admin/patient/list',
                openInNewTab: true
            },
            {
                id: 'appointments',
                title: 'Appointments',
                translate: 'MENU.APPS.APPOINTMENTS.COLLAPSIBLE',
                type: 'collapsible',
                icon: 'calendar',
                children: [
                    {
                        id: 'lists',
                        title: 'List',
                        translate: 'MENU.APPS.APPOINTMENTS.Lists',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/appointment/list',
                        openInNewTab: true
                    },
                    {
                        id: 'chairview',
                        title: 'Chair View',
                        translate: 'MENU.APPS.APPOINTMENTS.ChairView',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/appointment/chairview',
                        openInNewTab: true
                    },
                    {
                        id: 'calendarview',
                        title: 'Calendar View',
                        translate: 'MENU.APPS.APPOINTMENTS.CalendarView',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/appointment/calendarview',
                        openInNewTab: true
                    },
                    {
                        id: 'setschedule',
                        title: 'Set Schedule',
                        translate: 'MENU.APPS.APPOINTMENTS.SetSchedule',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/appointment/assign',
                        openInNewTab: true
                    },
                    {
                        id: 'waitingroom',
                        title: 'Waiting Room',
                        translate: 'MENU.APPS.APPOINTMENTS.WaitingRoom',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/appointment/waitingroom',
                        openInNewTab: true
                    }
                ]
            },

            {
                id: 'report',
                title: 'Report',
                translate: 'MENU.APPS.REPORT.COLLAPSIBLE',
                type: 'collapsible',
                icon: 'bar-chart',
                children: [
                    {
                        id: 'payments',
                        title: 'Payments',
                        translate: 'MENU.APPS.REPORT.Payments',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/reports/payments',
                        openInNewTab: true
                    },
                    {
                        id: 'patientsworkdones',
                        title: 'Patient Wokdones',
                        translate: 'MENU.APPS.REPORT.PatientWorkdones',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/reports/patient-workdones',
                        openInNewTab: true
                    },
                    //{
                    //    id: 'patientworkdone',
                    //    title: 'Patient Workdone',
                    //    translate: 'MENU.APPS.REPORT.PatientWorkdone',
                    //    type: 'item',
                    //    icon: 'circle',
                    //    url: 'admin/reports/patient-workdone'
                    //}

                ]
            },

            {
                id: 'drugs',
                title: 'Drugs',
                translate: 'MENU.APPS.Drugs',
                type: 'item',
                icon: 'heart',
                url: 'admin/drug/list',
                openInNewTab: true
            },

            //{
            //    id: 'profile',
            //    title: 'Profile',
            //    translate: 'MENU.APPS.PROFILE.COLLAPSIBLE',
            //    type: 'collapsible',
            //    icon: 'user',
            //    children: [
            //        {
            //            id: 'personalinfo ',
            //            title: 'Personal Info',
            //            translate: 'MENU.APPS.PROFILE.PersonalInfo',
            //            type: 'item',
            //            icon: 'circle',
            //            url: 'admin/dashboard14'
            //        },
            //        {
            //            id: 'manageeducation',
            //            title: 'Manage Education',
            //            translate: 'MENU.APPS.PROFILE.ManageEducation',
            //            type: 'item',
            //            icon: 'circle',
            //            url: 'admin/dashboard15'
            //        },
            //        {
            //            id: 'manageexperiences',
            //            title: 'Manage Experiences',
            //            translate: 'MENU.APPS.PROFILE.ManageExperiences',
            //            type: 'item',
            //            icon: 'circle',
            //            url: 'admin/dashboard16'
            //        }
            //    ]
            //},

            {
                id: 'changepassword',
                title: 'Change Password',
                translate: 'MENU.APPS.ChangePassword',
                type: 'item',
                icon: 'key',
                url: 'admin/changepassword',
                openInNewTab: true
            },

            {
                id: 'logout',
                title: 'Logout',
                translate: 'MENU.APPS.Logout',
                type: 'item',
                icon: 'unlock',
                url: 'auth/logout',
                openInNewTab: true
            },


        ]
    },


];


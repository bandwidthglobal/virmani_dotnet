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
                title: 'Dashboards',
                translate: 'MENU.APPS.Dashboards',
                type: 'item',
                icon: 'home',
                url: 'admin/dashboard'
            },
            {
                id: 'subscription',
                title: 'Subscription',
                translate: 'MENU.APPS.Subscription',
                type: 'item',
                icon: 'message-square',
                url: 'apps/subscription'
            },
            {
                id: 'registrations',
                title: 'Registrations',
                translate: 'MENU.APPS.Registrations',
                type: 'item',
                icon: 'check-square',
                url: 'apps/registrations'
            },
            {
                id: 'qrcode',
                title: 'qrcode',
                translate: 'MENU.APPS.QRCode',
                type: 'item',
                icon: 'calendar',
                url: 'apps/qrcode'
            },
            {
                id: 'ratingreviews',
                title: 'Rating Reviews',
                translate: 'MENU.APPS.RatingReviews',
                type: 'item',
                icon: 'calendar',
                url: 'apps/ratingreviews'
            },
            {
                id: 'departments',
                title: 'Departments',
                translate: 'MENU.APPS.Departments',
                type: 'item',
                icon: 'calendar',
                url: 'admin/departments'
            },
            {
                id: 'consultationcettings',
                title: 'ConsultationSettings',
                translate: 'MENU.APPS.ConsultationSettings',
                type: 'item',
                icon: 'calendar',
                url: 'admin/consultationcettings'
            },
            {
                id: 'consultations',
                title: 'Consultations',
                translate: 'MENU.APPS.Consultations',
                type: 'item',
                icon: 'calendar',
                url: 'admin/consultations'
            },
            {
                id: 'staffs',
                title: 'Staffs',
                translate: 'MENU.APPS.Staffs',
                type: 'item',
                icon: 'calendar',
                url: 'admin/staff/list'
            },
            {
                id: 'dealer',
                title: 'Dealer',
                translate: 'MENU.APPS.Dealer',
                type: 'item',
                icon: 'calendar',
                url: 'admin/dealer/list'
            },
            {
                id: 'doctors',
                title: 'Doctors',
                translate: 'MENU.APPS.Doctors',
                type: 'item',
                icon: 'calendar',
                url: 'admin/doctor/list'
            },

            {
                id: 'settings',
                title: 'Settings',
                translate: 'MENU.APPS.SETTINGS.COLLAPSIBLE',
                type: 'collapsible',
                icon: 'file-text',
                children: [
                    {
                        id: 'clinicaldiagnosis',
                        title: 'Clinical Diagnosis',
                        translate: 'MENU.APPS.SETTINGS.ClinicalDiagnosis',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard4'
                    },
                    {
                        id: 'advise',
                        title: 'Advise',
                        translate: 'MENU.APPS.SETTINGS.Advise',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard5'
                    },
                    {
                        id: 'diagnosistests',
                        title: 'Diagnosis Tests',
                        translate: 'MENU.APPS.SETTINGS.DiagnosisTests',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard6'
                    },
                    {
                        id: 'prosthesistype',
                        title: 'Prosthesis Type',
                        translate: 'MENU.APPS.SETTINGS.ProsthesisType',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard7'
                    }
                    ,
                    {
                        id: 'chairs',
                        title: 'Chairs',
                        translate: 'MENU.APPS.SETTINGS.Chairs',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/settings/chair/list'
                    }
                ]
            },


            {
                id: 'Prescription',
                title: 'Prescription',
                translate: 'MENU.APPS.PRESCRIPTION.COLLAPSIBLE',
                type: 'collapsible',
                icon: 'shopping-cart',
                children: [
                    {
                        id: 'createnew',
                        title: 'Create New',
                        translate: 'MENU.APPS.PRESCRIPTION.CreateNew',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/prescription/add'
                    },
                    {
                        id: 'prescriptions',
                        title: 'Prescriptions',
                        translate: 'MENU.APPS.PRESCRIPTION.Prescriptions',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/prescription/list'
                    },
                ]
            },

            {
                id: 'patients',
                title: 'Patients',
                translate: 'MENU.APPS.Patients',
                type: 'item',
                icon: 'calendar',
                url: 'admin/patient/list'
            },
            {
                id: 'appointments',
                title: 'Appointments',
                translate: 'MENU.APPS.APPOINTMENTS.COLLAPSIBLE',
                type: 'collapsible',
                icon: 'user',
                children: [
                    {
                        id: 'lists',
                        title: 'Lists',
                        translate: 'MENU.APPS.APPOINTMENTS.Lists',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/appointment/list'
                    },
                    {
                        id: 'chairview',
                        title: 'Chair View',
                        translate: 'MENU.APPS.APPOINTMENTS.ChairView',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard10'
                    },
                    {
                        id: 'callendarview',
                        title: 'Callendar View',
                        translate: 'MENU.APPS.APPOINTMENTS.CallendarView',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard11'
                    },
                    {
                        id: 'setschedule',
                        title: 'Set Schedule',
                        translate: 'MENU.APPS.APPOINTMENTS.SetSchedule',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard12'
                    },
                    {
                        id: 'waitingroom',
                        title: 'Waiting Room',
                        translate: 'MENU.APPS.APPOINTMENTS.WaitingRoom',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard13'
                    }
                ]
            },

            {
                id: 'report',
                title: 'Report',
                translate: 'MENU.APPS.REPORT.COLLAPSIBLE',
                type: 'collapsible',
                icon: 'user',
                children: [
                    {
                        id: 'payments',
                        title: 'Payments',
                        translate: 'MENU.APPS.REPORT.Payments',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/reports'
                    }
                ]
            },

            {
                id: 'drugs',
                title: 'Drugs',
                translate: 'MENU.APPS.Drugs',
                type: 'item',
                icon: 'medicin',
                url: 'admin/drug/list'
            },

            {
                id: 'profile',
                title: 'Profile',
                translate: 'MENU.APPS.PROFILE.COLLAPSIBLE',
                type: 'collapsible',
                icon: 'user',
                children: [
                    {
                        id: 'personalinfo ',
                        title: 'Personal Info',
                        translate: 'MENU.APPS.PROFILE.PersonalInfo',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard14'
                    },
                    {
                        id: 'manageeducation',
                        title: 'Manage Education',
                        translate: 'MENU.APPS.PROFILE.ManageEducation',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard15'
                    },
                    {
                        id: 'manageexperiences',
                        title: 'Manage Experiences',
                        translate: 'MENU.APPS.PROFILE.ManageExperiences',
                        type: 'item',
                        icon: 'circle',
                        url: 'admin/dashboard16'
                    }
                ]
            },

            {
                id: 'changepassword',
                title: 'Change Password',
                translate: 'MENU.APPS.ChangePassword',
                type: 'item',
                icon: 'key',
                url: 'admin/changepassword'
            },

            {
                id: 'logout',
                title: 'Logout',
                translate: 'MENU.APPS.Logout',
                type: 'item',
                icon: 'unlock',
                url: 'auth/logout'
            },


        ]
    },


];


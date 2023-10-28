import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menuDoctor: CoreMenu[] = [

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

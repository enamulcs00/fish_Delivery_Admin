import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Dashboard',
        icon: 'mdi mdi-view-dashboard',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/pages/users',
        title: 'Users',
        icon: 'sl-icon-user',
        class: '',
        extralink: false,
        submenu: []
    },
    {
      path: '/pages/manage_admin',
      title: 'Admin',
      icon: 'mdi mdi-chart-arc',
      class: '',
      extralink: false,
      submenu: []
  },
     {
        path: '/pages/events',
        title: 'Events',
        icon: ' far fa-list-alt',
        class: '',
        extralink: false,
        submenu: []
    },
    {
      path: '/pages/groups',
      title: 'Groups',
      icon: ' far fa-list-alt',
      class: '',
      extralink: false,
      submenu: []
  },

    {
        path: '/pages/report',
        title: 'Report',
        icon: 'mdi mdi-account-star-variant',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/pages/eventType',
        title: 'Event Types',
        icon: 'mdi mdi-package-variant',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/pages/notification',
        title: 'Notification',
        icon: 'sl-icon-bell',
        class: '',
        extralink: false,
        submenu: []
    },



     {
        path: '',
        title: 'CMS Pages',
        icon: 'icon-Car-Wheel',
        class: 'has-arrow',
        extralink: false,
        submenu: [
        {
            path: '/pages/privacy',
            title: 'Privacy',
            icon: '',
            class: '',
            extralink: false,
            submenu: []
        },
        {
            path: '/pages/terms',
            title: 'Terms',
            icon: '',
            class: '',
            extralink: false,
            submenu: []
        },
        ]
    },

    // {
    //     path: '',
    //     title: 'Authentication',
    //     icon: 'icon-Administrator',
    //     class: 'has-arrow',
    //     extralink: false,

    //     submenu: [

    //         {
    //             path: '/authentication/login2',
    //             title: 'Login 2',
    //             icon: '',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/authentication/signup',
    //             title: 'Register',
    //             icon: '',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/authentication/signup2',
    //             title: 'Register 2',
    //             icon: '',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/authentication/404',
    //             title: '404',
    //             icon: '',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/authentication/lock',
    //             title: 'Lockscreen',
    //             icon: '',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
        // ],

    //  },
    //  {
    //     path: '/login',
    //     title: 'Login',
    //     icon: '',
    //     class: '',
    //     extralink: false,
    //     submenu: []
    // }
    // {
    //     path: '',
    //     title: 'Pages',
    //     icon: 'icon-Files',
    //     class: 'has-arrow',
    //     extralink: false,
    //     submenu: [
    //         {
    //             path: '/pages/profile',
    //             title: 'Profile',
    //             icon: '',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         },
    //         {
    //             path: '/starter',
    //             title: 'Starter Page',
    //             icon: '',
    //             class: '',
    //             extralink: false,
    //             submenu: []
    //         }
    //     ]
    // },

];

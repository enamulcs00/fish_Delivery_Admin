import { Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/authentication/auth-guard.guard';

import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { NotificationComponent } from './notification/notification.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { PrivacyComponent } from './privacy-policy/privacy.component';
import { AdminComponent } from './admin/admin.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { AdminformComponent } from './adminform/adminform.component';
import { NotificationhistoryComponent } from './notificationhistory/notificationhistory.component';
import { VendororderlistComponent } from './vendororderlist/vendororderlist.component';
import { TermsComponent } from './terms/terms.component';
import { ManageAdminEditComponent } from './manage-admin-edit/manage-admin-edit.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Users' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'users_detail',
        component: UsersDetailComponent,
        data: {
          title: 'Users Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Users Detail' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'groups',
        component: FoodItemsComponent,
        data: {
          title: 'Groups',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Groups' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      // {
      //   path: 'orderlist',
      //   component: EventsComponent,
      //   data: {
      //     title: 'Events',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboard' },
      //       { title: 'Events' }
      //     ]
      //   },
      //   canActivate: [AuthGuardGuard]
      // },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Profile Page' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'events',
        component: OrderlistComponent,
        data: {
          title: 'Events',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Events' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },

      // {
      //   path: 'usersdetail',
      //   component: UsersDetailComponent,
      //   data: {
      //     title: 'Users Detail',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboard' },
      //       { title: 'Users' }
      //     ]
      //   }
      // },

      {
        path: 'eventType',
        component: CalculatorComponent,
        data: {
          title: 'Event Type',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Event Type' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'report',
        component: ReviewsComponent,
        data: {
          title: 'Report',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Report' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'manage_admin',
        component: AdminComponent,
        data: {
          title: 'Admin',
          urls: [
            { title: 'Dashboard', url: '/manage_admin' },
            { title: 'Admin' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'manage_admin_form',
        //canActivate: [AuthGaurdGuard],
        component: AdminformComponent,
        data: {
          title: 'Admin Detail',
          urls: [
            { title: 'Dashboard', url: '/manage_admin' },
            { title: 'Admin' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'manage_admin_edit',
        //canActivate: [AuthGaurdGuard],
        component: ManageAdminEditComponent,
        data: {
          title: 'Edit Admin Detail',
          urls: [
            { title: 'Dashboard', url: '/manage_admin' },
            { title: 'Admin' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'notification',
        component: NotificationComponent,
        data: {
          title: 'Notification',
          urls: [
            { title: 'Dashboard', url: '/notification' },
            { title: 'Notification' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'notificationhistory',
        component: NotificationhistoryComponent,
        data: {
          title: 'Notification History',
          urls: [
            { title: 'Dashboard', url: '/notification_history' },
            { title: 'Notification History' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'privacy',
        component: PrivacyComponent,
        data: {
          title: 'Privacy',
          urls: [
            { title: 'Dashboard', url: '/privacy' },
            { title: 'Privacy' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'terms',
        component: TermsComponent,
        data: {
          title: 'Terms',
          urls: [
            { title: 'Dashboard', url: '/terms' },
            { title: 'terms' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'vendororder',
        component: VendororderlistComponent,
        data: {
          title: 'Orders',
          urls: [
            { title: 'Dashboard', url: '/editvendor' },
            { title: 'Orders' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },


    ]
  }
];

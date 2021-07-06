import { Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/authentication/auth-guard.guard';

import { HelperclassesComponent } from './helper-classes/hc.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { UsersComponent } from './users/users.component';
import { BikesComponent } from './bikes/bikes.component';
import { ToursComponent } from './tours/tours.component';
import { DestinationComponent } from './destination/destination.component';
import { HotelsComponent } from './hotels/hotels.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { RevenueManagementComponent } from './revenue-management/revenue-management.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { NotificationComponent } from './notification/notification.component';
import { VendorsComponent } from './vendors/vendors.component';
import { EventsComponent } from './events/events.component';
import { RewardsComponent } from './rewards/rewards.component';
import { VendordetailComponent } from './vendordetail/vendordetail.component';
import { UserhistoryComponent } from './userhistory/userhistory.component';
import { PromocodeComponent } from './promocode/promocode.component';
import {VendorhistoryComponent } from './vendorhistory/vendorhistory.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { FoodCategoriesComponent } from './food-categories/food-categories.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { BannerComponent } from './banner/banner.component';
import { PrivacyComponent } from './privacy-policy/privacy.component';
import { AdminComponent } from './admin/admin.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { DriverComponent } from './driver/driver.component';
import { DriverdetailComponent } from './driverdetail/driverdetail.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { AdminformComponent } from './adminform/adminform.component';
// import { UsersDetailComponent } from './users-detail/users-detail.component';
import { NotificationhistoryComponent } from './notificationhistory/notificationhistory.component';
import { SupportComponent } from './support/support.component';
import { GeofenceComponent } from './geofence/geofence.component';
import { GeofencelistComponent } from './geofencelist/geofencelist.component';
import { GeofenceditComponent } from './geofencedit/geofencedit.component';
import { ProductSaleComponent } from './product-sale/product-sale.component';
import { AddvendorComponent } from './addvendor/addvendor.component';
import { EditvendorComponent } from './editvendor/editvendor.component';
import { VendororderlistComponent } from './vendororderlist/vendororderlist.component';
import { VendorcategoryComponent } from './vendorcategory/vendorcategory.component';
import { VendorbusinessComponent } from './vendorbusiness/vendorbusiness.component';
import { TrucklistComponent } from './trucklist/trucklist.component';
import { TruckcategoryComponent } from './truckcategory/truckcategory.component';
import { TermsComponent } from './terms/terms.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'helperclasses',
        component: HelperclassesComponent,
        data: {
          title: 'Helper Classes',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Helper Classes' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
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
        path: 'usershistory',
        component: UserhistoryComponent,
        data: {
          title: 'User History',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'User History' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'vendors',
        component: VendorsComponent,
        data: {
          title: 'Vendors',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Vendors' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'vendorsdetail',
        component: VendordetailComponent,
        data: {
          title: 'Vendors Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Vendors Detail' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'foodcategories',
        component: FoodCategoriesComponent,
        data: {
          title: 'Food Categories',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Food Categories' }
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
      {
        path: 'events',
        component: EventsComponent,
        data: {
          title: 'Events',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Events' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'rewards',
        component: RewardsComponent,
        data: {
          title: 'Discount',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Discount' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'promocode',
        component: PromocodeComponent,
        data: {
          title: 'Promo Code',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Promo Code' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'Inventory',
        component: InventoryComponent,
        data: {
          title: 'Inventory',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Inventory' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
        data: {
          title: 'Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Invoice Page' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
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
        path: 'vendorHistory',
        component: VendorhistoryComponent,
        data: {
          title: 'Vendor History',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Vendor History' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'drivers',
        component: DriverComponent,
        data: {
          title: 'Drivers',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Drivers' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'driversdetail',
        component: DriverdetailComponent,
        data: {
          title: 'Drivers Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Drivers Detail' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'orderlist',
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
      {
        path: 'orderdetail',
        component: OrderdetailComponent,
        data: {
          title: 'Order Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Order Detail' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'banner',
        component: BannerComponent,
        data: {
          title: 'Banner',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Banner ' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'pricing',
        component: PricingComponent,
        data: {
          title: 'Pricing',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Pricing Page' }
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
        path: 'tours',
        component: ToursComponent,
        data: {
          title: 'Tours',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Tours' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'bikes',
        component: BikesComponent,
        data: {
          title: 'Bikes',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Bikes' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'destination',
        component: DestinationComponent,
        data: {
          title: 'Destination',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Destination' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'hotels',
        component: HotelsComponent,
        data: {
          title: 'Hotels',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Hotels' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
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
        path: 'reviews',
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
        path: 'revenue',
        component: RevenueManagementComponent,
        data: {
          title: 'Revenue',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Revenue' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: {
          title: 'Analytics',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Analytics' }
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
            { title: 'Profile' }
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
            { title: 'Profile' }
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
        path: 'support',
        component: SupportComponent,
        data: {
          title: 'Support',
          urls: [
            { title: 'Dashboard', url: '/support' },
            { title: 'Suppoort' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'langingpage',
        component: AboutComponent,
        data: {
          title: 'Landing Page',
          urls: [
            { title: 'Dashboard', url: '/about' },
            { title: 'About' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          title: 'Contact',
          urls: [
            { title: 'Dashboard', url: '/contact' },
            { title: 'Contact' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ',
          urls: [
            { title: 'Dashboard', url: '/faq' },
            { title: 'Faq' }
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
        path: 'geofence',
        component: GeofenceComponent,
        data: {
          title: 'Geofence',
          urls: [
            { title: 'Dashboard', url: '/geofence' },
            { title: 'Geofence' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'geofencelist',
        component: GeofencelistComponent,
        data: {
          title: 'Geofence List',
          urls: [
            { title: 'Dashboard', url: '/geofencelist' },
            { title: 'Geofence List' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'geofencedit',
        component: GeofenceditComponent,
        data: {
          title: 'Geofence Edit',
          urls: [
            { title: 'Dashboard', url: '/geofencedit' },
            { title: 'Geofence Edit' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'productsale',
        component: ProductSaleComponent,
        data: {
          title: 'Product Sale',
          urls: [
            { title: 'Dashboard', url: '/productsale' },
            { title: 'Product Sale' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
       {
        path: 'addvendor',
        component: AddvendorComponent,
        data: {
          title: 'Add Vendor',
          urls: [
            { title: 'Dashboard', url: '/addvendor' },
            { title: 'Add Vendor' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'editvendor',
        component: EditvendorComponent,
        data: {
          title: 'Edit Vendor',
          urls: [
            { title: 'Dashboard', url: '/editvendor' },
            { title: 'Edit Vendor' }
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
      {
        path: 'vendorcategory',
        component: VendorcategoryComponent,
        data: {
          title: 'Vendor Category',
          urls: [
            { title: 'Dashboard', url: '/editvendor' },
            { title: 'Vendor Category' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'vendorbusiness',
        component: VendorbusinessComponent,
        data: {
          title: 'Business',
          urls: [
            { title: 'Dashboard', url: '/editvendor' },
            { title: ' Business' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'trucks',
        component: TrucklistComponent,
        data: {
          title: 'Truck List',
          urls: [
            { title: 'Dashboard', url: '/truks' },
            { title: ' Truck List' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'truckscategory',
        component: TruckcategoryComponent,
        data: {
          title: 'Category',
          urls: [
            { title: 'Dashboard', url: '/truks' },
            { title: ' Category' }
          ]
        },
        canActivate: [AuthGuardGuard]
      },

    ]
  }
];

import { Routes } from '@angular/router';

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
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { ReportComponent } from './report/report.component';
import { ReasonComponent } from './reason/reason.component';


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
        }
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
        }
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
        }
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
        }
      },
      {
        path: 'vendors',
        component: VendorsComponent,
        data: {
          title: 'Service Provider',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Service Provider' }
          ]
        }
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
        }
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
        }
      },
      {
        path: 'fooditem',
        component: FoodItemsComponent,
        data: {
          title: 'Row Food Items',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Food Items' }
          ]
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
      },
      {
        path: 'vendorHistory',
        component: VendorhistoryComponent,
        data: {
          title: 'Service Provider Profile',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Service Provider Profile' }
          ]
        }
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
        }
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
        }
      },
      {
        path: 'orderlist',
        component: OrderlistComponent,
        data: {
          title: 'Orders',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Order List' }
          ]
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
      },
      {
        path: 'calculator',
        component: CalculatorComponent,
        data: {
          title: 'Calculator',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Caculator' }
          ]
        }
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
        data: {
          title: 'Reviews',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Reviews' }
          ]
        }
      },
      {
        path: 'suggestions',
        component: SuggestionsComponent,
        data: {
          title: 'Suggestions',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Suggestions' }
          ]
        }
      },
      {
        path: 'report',
        component: ReportComponent,
        data: {
          title: 'Report',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Report' }
          ]
        }
      },
      {
        path: 'reason',
        component: ReasonComponent,
        data: {
          title: 'Reason',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Reason' }
          ]
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'Faq',
          urls: [
            { title: 'Dashboard', url: '/faq' },
            { title: 'Faq' }
          ]
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
      },
       {
        path: 'addvendor',
        component: AddvendorComponent,
        data: {
          title: 'Add Service Provider',
          urls: [
            { title: 'Dashboard', url: '/addvendor' },
            { title: 'Add Service Provider' }
          ]
        }
      },
      {
        path: 'editvendor',
        component: EditvendorComponent,
        data: {
          title: 'Edit Service Provider',
          urls: [
            { title: 'Dashboard', url: '/editvendor' },
            { title: 'Edit Service Provider' }
          ]
        }
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
        }
      },
      {
        path: 'vendorcategory',
        component: VendorcategoryComponent,
        data: {
          title: 'Category',
          urls: [
            { title: 'Dashboard', url: '/editvendor' },
            { title: 'Category' }
          ]
        }
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
        }
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
        }
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
        }
      },

    ]
  }
];

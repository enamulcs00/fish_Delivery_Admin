import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { PagesRoutes } from "./pages.routing";
import { HelperclassesComponent } from "./helper-classes/hc.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { ProfileComponent } from "./profile/profile.component";
// import { PricingComponent } from './pricing/pricing.component';
import { UsersComponent } from "./users/users.component";
// import { BikesComponent } from './bikes/bikes.component';
// import { ToursComponent } from './tours/tours.component';
// import { DestinationComponent } from './destination/destination.component';
// import { HotelsComponent } from './hotels/hotels.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { RevenueManagementComponent } from "./revenue-management/revenue-management.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { CmsComponent } from "./pages/cms/cms.component";
import { AboutComponent } from "./about/about.component";
import { QuillModule } from "ngx-quill";
import { ContactComponent } from "./contact/contact.component";
import { FaqComponent } from "./faq/faq.component";
import { ChartistModule } from "ng-chartist";
import { ChartsModule } from "ng2-charts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NotificationComponent } from "./notification/notification.component";
import { VendorsComponent } from "./vendors/vendors.component";
import { EventsComponent } from "./events/events.component";
import { RewardsComponent } from "./rewards/rewards.component";
import { VendordetailComponent } from "./vendordetail/vendordetail.component";
import { UserhistoryComponent } from "./userhistory/userhistory.component";
import { PromocodeComponent } from "./promocode/promocode.component";
import { VendorhistoryComponent } from "./vendorhistory/vendorhistory.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatExpansionModule } from "@angular/material/expansion";
import { UsersDetailComponent } from "./users-detail/users-detail.component";
import { FoodCategoriesComponent } from "./food-categories/food-categories.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { OrderlistComponent } from "./orderlist/orderlist.component";
import { BannerComponent } from "./banner/banner.component";
import { PrivacyComponent } from "./privacy-policy/privacy.component";
import { AdminComponent } from "./admin/admin.component";
import { FoodItemsComponent } from "./food-items/food-items.component";
import { MatSelectModule } from "@angular/material/select";
import { DriverComponent } from "./driver/driver.component";
import { DriverdetailComponent } from "./driverdetail/driverdetail.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { OrderdetailComponent } from "./orderdetail/orderdetail.component";
import { AdminformComponent } from "./adminform/adminform.component";
import { NotificationhistoryComponent } from "./notificationhistory/notificationhistory.component";
import { StoreComponent } from "./store/store.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { SupportComponent } from "./support/support.component";
import { GeofenceComponent } from "./geofence/geofence.component";
import { GeofencelistComponent } from "./geofencelist/geofencelist.component";
import { AgmCoreModule } from "@agm/core";
import { GeofenceditComponent } from "./geofencedit/geofencedit.component";
import { ProductSaleComponent } from "./product-sale/product-sale.component";
import { AddvendorComponent } from "./addvendor/addvendor.component";
import { EditvendorComponent } from "./editvendor/editvendor.component";
import { VendorcategoryComponent } from "./vendorcategory/vendorcategory.component";
import { VendororderlistComponent } from "./vendororderlist/vendororderlist.component";
import { VendorbusinessComponent } from "./vendorbusiness/vendorbusiness.component";
import { TrucklistComponent } from "./trucklist/trucklist.component";
import { TruckcategoryComponent } from "./truckcategory/truckcategory.component";
import { TrucklocationComponent } from "./trucklocation/trucklocation.component";
import { TermsComponent } from "./terms/terms.component";
import { ManageAdminEditComponent } from './manage-admin-edit/manage-admin-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    NgbModule,
    QuillModule.forRoot(),
    ChartsModule,
    ChartistModule,
    NgxChartsModule,
    NgxDatatableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    AgmCoreModule,
  ],
  declarations: [
    HelperclassesComponent,


    InvoiceComponent,
    ProfileComponent,
    UsersComponent,
    // BikesComponent,
    // ToursComponent,
    // DestinationComponent,
    // HotelsComponent,
    CalculatorComponent,
    RevenueManagementComponent,
    ReviewsComponent,
    AnalyticsComponent,
    CmsComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    NotificationComponent,
    VendorsComponent,
    EventsComponent,
    RewardsComponent,
    VendordetailComponent,
    UserhistoryComponent,
    UsersDetailComponent,
    PromocodeComponent,
    VendorhistoryComponent,
    FoodCategoriesComponent,
    InventoryComponent,
    OrderlistComponent,
    BannerComponent,
    PrivacyComponent,
    AdminComponent,
    FoodItemsComponent,
    DriverComponent,
    DriverdetailComponent,
    OrderdetailComponent,
    AdminformComponent,
    NotificationhistoryComponent,
    StoreComponent,
    RestaurantsComponent,
    SupportComponent,
    GeofenceComponent,
    GeofencelistComponent,
    GeofenceditComponent,
    ProductSaleComponent,
    AddvendorComponent,
    EditvendorComponent,
    VendorcategoryComponent,
    VendororderlistComponent,
    VendorbusinessComponent,
    TrucklistComponent,
    TruckcategoryComponent,
    TrucklocationComponent,
    TermsComponent,
    ManageAdminEditComponent,
  ],
})
export class PagesModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { PagesRoutes } from "./pages.routing";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";
import { CalculatorComponent } from './calculator/calculator.component';
import { ReviewsComponent } from "./reviews/reviews.component";
import { CmsComponent } from "./pages/cms/cms.component";
import { QuillModule } from "ngx-quill";
import { ChartistModule } from "ng-chartist";
import { ChartsModule } from "ng2-charts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NotificationComponent } from "./notification/notification.component";
import { EventsComponent } from "./events/events.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatExpansionModule } from "@angular/material/expansion";
import { UsersDetailComponent } from "./users-detail/users-detail.component";
import { OrderlistComponent } from "./orderlist/orderlist.component";
import { PrivacyComponent } from "./privacy-policy/privacy.component";
import { AdminComponent } from "./admin/admin.component";
import { FoodItemsComponent } from "./food-items/food-items.component";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { AdminformComponent } from "./adminform/adminform.component";
import { NotificationhistoryComponent } from "./notificationhistory/notificationhistory.component";
import { StoreComponent } from "./store/store.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { AgmCoreModule } from "@agm/core";
import { VendororderlistComponent } from "./vendororderlist/vendororderlist.component";
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
    ProfileComponent,
    UsersComponent,
    CalculatorComponent,
    ReviewsComponent,
    CmsComponent,
    NotificationComponent,
    EventsComponent,
    UsersDetailComponent,
    OrderlistComponent,
    PrivacyComponent,
    AdminComponent,
    FoodItemsComponent,
    AdminformComponent,
    NotificationhistoryComponent,
    StoreComponent,
    RestaurantsComponent,
    VendororderlistComponent,
    TrucklocationComponent,
    TermsComponent,
    ManageAdminEditComponent,
  ],
})
export class PagesModule {}

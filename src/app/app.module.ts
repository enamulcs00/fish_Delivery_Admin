import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy,
} from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgmCoreModule } from "@agm/core";
import { ToastrModule } from "ngx-toastr";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FullComponent } from "./layouts/full/full.component";
import { BlankComponent } from "./layouts/blank/blank.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NavigationComponent } from "./shared/header-navigation/navigation.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { BreadcrumbComponent } from "./shared/breadcrumb/breadcrumb.component";

import { Approutes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpinnerComponent } from "./shared/spinner.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { InterceptorInterceptor } from "./authentication/interceptor.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PrivacycmsComponent } from './privacycms/privacycms.component';
import { TermscmsComponent } from './termscms/termscms.component';
// import { NgxSpinnerModule } from "ngx-spinner";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20,
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    PrivacycmsComponent,
    TermscmsComponent,
  ],
  imports: [
    // NgxSpinnerModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false }),
    PerfectScrollbarModule,
    Ng2SearchPipeModule,
    MatSlideToggleModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBUb3jDWJQ28vDJhuQZxkC0NXr_zycm8D0",
      libraries: ["places", "drawing", "geometry"],
    }),
    DragDropModule,
  ],

  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

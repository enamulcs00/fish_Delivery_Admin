import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { nextSortDir } from "@swimlane/ngx-datatable";
// import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  token: any;

  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.token = sessionStorage.getItem("token");
    // this.spinner.show();
    if (this.token) {
      if (req.url == "https://restcountries.eu/rest/v2/all") {
        return next.handle(req).pipe(finalize(() => console.log()));
      }
      req = req.clone({
        headers: req.headers.set("Authorization", this.token),
      });

      return next.handle(req).pipe(finalize(() => console.log()));
    } else {
      return next.handle(req).pipe(finalize(() => console.log()));
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseURL = "http://15.207.74.128:9045/api/v1/";
  clientURL = "https://api.thelassoapp.com/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.clientURL}Admin/dashboard`, data);
  }

  // Get All
  totalCount() {
    return this.http.get<any>(`${this.clientURL}Admin/dashboardData`);
  }
}
